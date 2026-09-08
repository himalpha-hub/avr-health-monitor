import json
import asyncio

from fastapi import FastAPI
from fastapi import WebSocket

from drivers.can_driver import CANDriver
# from drivers.rs422_driver import RS422Driver
from drivers.usb_ttl_driver import USBTTLDriver
from drivers.simulator_driver import SimulatorDriver

from protocol.dispatcher import Dispatcher

from telemetry.telemetry_store import TelemetryStore
from telemetry.freshness_monitor import FreshnessMonitor

from services.websocket_service import WebSocketService

from services.transport_manager import TransportManager
from fastapi import Body
from fastapi.middleware.cors import CORSMiddleware


# ==========================================================
# CONFIG
# ==========================================================

with open(
    "config/transport_config.json",
    "r",
) as f:

    CONFIG = json.load(f)


# ==========================================================
# DRIVER FACTORY
# ==========================================================

def create_driver():

    transport = CONFIG["transport"]

    if transport == "can":

        return CANDriver(
            channel=CONFIG["can"]["channel"],
            bitrate=CONFIG["can"]["bitrate"],
            data_bitrate=CONFIG["can"]["data_bitrate"],
        )

    # if transport == "rs422":

    #     return RS422Driver(
    #         port=CONFIG["rs422"]["port"],
    #         baudrate=CONFIG["rs422"]["baudrate"],
    #     )

    if transport == "usb_ttl":

        return USBTTLDriver(
            port=CONFIG["usb_ttl"]["port"],
            baudrate=CONFIG["usb_ttl"]["baudrate"],
        )

    if transport == "simulator":

        return SimulatorDriver()

    raise RuntimeError(
        f"Unsupported transport: {transport}"
    )


# ==========================================================
# GLOBAL OBJECTS
# ==========================================================

store = TelemetryStore()

dispatcher = Dispatcher(store)

freshness_monitor = FreshnessMonitor(store)

websocket_service = WebSocketService(store)

transport_manager = TransportManager(
    CONFIG
)



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# RECEIVE TASK
# ==========================================================

async def receiver_task():

    while True:

        frame = transport_manager.get_driver().read_frame()

        if frame is not None:
            
            print(
                "RAW:",
                frame.arbitration_id,
                frame.data.hex()
                )

            print(
                f"[RECEIVER] "
                f"ID=0x{frame.arbitration_id:04X} "
                f"LEN={len(frame.data)}"
            )

            dispatcher.process_frame(
                frame
            )

        await asyncio.sleep(
            0.001
        )


# ==========================================================
# FRESHNESS TASK
# ==========================================================

async def freshness_task():

    while True:

        freshness_monitor.run()

        await asyncio.sleep(0.1)


# ==========================================================
# STARTUP
# ==========================================================

@app.on_event("startup")
async def startup_event():

    connected = transport_manager.connect()

    if not connected:

        raise RuntimeError(
            "Driver connection failed"
        )

    asyncio.create_task(
        receiver_task()
    )

    asyncio.create_task(
        freshness_task()
    )

    asyncio.create_task(
        websocket_service.run()
    )


# ==========================================================
# SHUTDOWN
# ==========================================================

@app.on_event("shutdown")
async def shutdown_event():

    transport_manager.disconnect()


# ==========================================================
# WEBSOCKET
# ==========================================================

@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
):

    await websocket_service.client_handler(
        websocket
    )

# ==========================================================
# CONNECT / DISCONNECT
# ==========================================================

@app.post("/connect")
def connect_transport():

    success = transport_manager.connect()

    return {
        "success": success,
        "transport": transport_manager.get_transport(),
    }


@app.post("/disconnect")
def disconnect_transport():

    transport_manager.disconnect()

    store.clear()

    return {
        "success": True,
    }

# ==========================================================
# HEALTH
# ==========================================================

@app.get("/health")
def health():

    return {
        "status": "running",
        "transport": transport_manager.get_transport(),
        "connected": transport_manager.get_driver().is_connected(),
    }

@app.get("/transport")
def get_transport():

    return {
        "transport": transport_manager.get_transport(),
    }

@app.post("/transport")
def set_transport(
    payload: dict = Body(...)
):

    transport = payload.get(
        "transport"
    )

    success = transport_manager.switch_transport(
        transport
    )

    if success:

        print("CLEARING STORE")
        # store.clear()

        CONFIG["transport"] = transport

        with open(
            "config/transport_config.json",
            "w"
        ) as f:

            json.dump(
                CONFIG,
                f,
                indent=4
            )

    return {
        "success": success,
        "transport": transport_manager.get_transport(),
    }
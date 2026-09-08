import asyncio
import json
from dataclasses import asdict

from fastapi import WebSocket
from fastapi import WebSocketDisconnect

from telemetry.telemetry_store import TelemetryStore


class WebSocketService:

    def __init__(
        self,
        store: TelemetryStore,
    ) -> None:

        self._store = store

        self._clients: set[WebSocket] = set()

    # =====================================================
    # CLIENT MANAGEMENT
    # =====================================================

    async def connect(
        self,
        websocket: WebSocket,
    ) -> None:

        await websocket.accept()

        self._clients.add(websocket)

    async def disconnect(
        self,
        websocket: WebSocket,
    ) -> None:

        self._clients.discard(websocket)

    # =====================================================
    # CLIENT HANDLER
    # =====================================================

    async def client_handler(
        self,
        websocket: WebSocket,
    ) -> None:

        await self.connect(websocket)

        try:
            while True:

                await websocket.receive_text()

        except WebSocketDisconnect:

            await self.disconnect(websocket)

        except Exception:

            await self.disconnect(websocket)

    # =====================================================
    # TELEMETRY BROADCAST
    # =====================================================

    async def broadcast_snapshot(
        self,
    ) -> None:

        snapshot = self._store.get_snapshot()

        if snapshot is None:
            return

        payload = json.dumps(
    asdict(snapshot),
    default=str,
)

        disconnected_clients = []

        for client in list(self._clients):

            try:

                await client.send_text(
                    payload
                )

            except Exception:

                disconnected_clients.append(
                    client
                )

        for client in disconnected_clients:

            self._clients.discard(client)

    # =====================================================
    # PERIODIC TASK
    # =====================================================

    async def run(
        self,
        period_ms: int = 100,
    ) -> None:

        while True:

            await self.broadcast_snapshot()

            await asyncio.sleep(
                period_ms / 1000.0
            )
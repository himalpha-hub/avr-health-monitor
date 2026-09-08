import serial
import time

from drivers.base_driver import BaseDriver
from drivers.usb_ttl_frame import USBTTLFrame


SYNC1 = 0xAA


class USBTTLDriver(BaseDriver):

    def __init__(
        self,
        port: str,
        baudrate: int,
    ):

        self.port = port
        self.baudrate = baudrate

        self.ser = None
        self.connected = False

        self.rx_frames = 0
        self.rx_errors = 0

    def connect(self) -> bool:

        try:

            self.ser = serial.Serial(
                port=self.port,
                baudrate=self.baudrate,
                timeout=1,
            )

            self.connected = True

            print("")
            print("=================================")
            print(" USB TTL DRIVER")
            print("=================================")
            print(f"PORT     : {self.port}")
            print(f"BAUDRATE : {self.baudrate}")
            print("STATUS   : CONNECTED")
            print("=================================")
            print("")

            return True

        except Exception as e:

            print("")
            print("=================================")
            print(" USB TTL DRIVER ERROR")
            print("=================================")
            print(e)
            print("=================================")
            print("")

            return False

    def disconnect(self) -> None:

        if self.ser:

            try:
                self.ser.close()
            except Exception:
                pass

        self.connected = False

        print("")
        print("USBTTL DISCONNECTED")
        print("")

    def is_connected(self) -> bool:

        return self.connected

    def send_frame(
        self,
        arbitration_id: int,
        data: bytes,
    ) -> bool:

        return True

    def read_frame(self):

        if not self.connected:
            return None

        try:

            #
            # WAIT FOR SYNC
            #

            while True:

                sync = self.ser.read(1)

                if not sync:
                    return None

                if sync[0] == SYNC1:
                    break

            #
            # HEADER
            #
            # BYTE0 = CAN ID LOW
            # BYTE1 = CAN ID HIGH
            # BYTE2 = DLC
            #

            header = self.ser.read(3)

            if len(header) != 3:

                self.rx_errors += 1

                print(
                    "[USBTTL] HEADER TIMEOUT"
                )

                return None

            can_id = (
                header[0]
                | (header[1] << 8)
            )

            payload_len = header[2]

            #
            # SANITY
            #

            if payload_len > 64:

                self.rx_errors += 1

                print(
                    f"[USBTTL] INVALID DLC "
                    f"{payload_len}"
                )

                return None

            #
            # PAYLOAD
            #

            payload = self.ser.read(
                payload_len
            )

            if len(payload) != payload_len:

                self.rx_errors += 1

                print(
                    "[USBTTL] PAYLOAD TIMEOUT "
                    f"expected={payload_len} "
                    f"received={len(payload)}"
                )

                return None

            self.rx_frames += 1

            #
            # DEBUG
            #

            print(
                f"[RX {self.rx_frames:06d}] "
                f"ID=0x{can_id:04X} "
                f"DLC={payload_len} "
                f"DATA={payload.hex(' ')}"
            )

            #
            # FRAME OBJECT
            #

            frame = USBTTLFrame(
                arbitration_id=can_id,
                data=payload,
            )

            return frame

        except Exception as e:

            self.rx_errors += 1

            print(
                f"[USBTTL ERROR] {e}"
            )

            return None
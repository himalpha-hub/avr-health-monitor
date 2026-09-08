import can

from drivers.base_driver import BaseDriver


class CANDriver(BaseDriver):

    def __init__(
        self,
        channel: str,
        bitrate: int,
        data_bitrate: int,
    ):
        self.channel = channel
        self.bitrate = bitrate
        self.data_bitrate = data_bitrate

        self.bus = None

    def connect(self) -> bool:
        try:
            self.bus = can.Bus(
                interface="socketcan",
                channel=self.channel,
                bitrate=self.bitrate,
                data_bitrate=self.data_bitrate,
                fd=True,
            )

            return True

        except Exception as e:
            print(f"CAN connect error: {e}")
            return False

    def disconnect(self) -> None:
        if self.bus:
            self.bus.shutdown()
            self.bus = None

    def is_connected(self) -> bool:
        return self.bus is not None

    def read_frame(self):
        if not self.bus:
            return None

        try:
            return self.bus.recv(timeout=0.01)

        except Exception:
            return None

    def send_frame(
        self,
        arbitration_id: int,
        data: bytes,
    ) -> bool:
        if not self.bus:
            return False

        try:
            msg = can.Message(
                arbitration_id=arbitration_id,
                data=data,
                is_extended_id=True,
                is_fd=True,
            )

            self.bus.send(msg)

            return True

        except Exception as e:
            print(f"CAN send error: {e}")
            return False
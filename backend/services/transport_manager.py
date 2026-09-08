from drivers.can_driver import CANDriver
from drivers.usb_ttl_driver import USBTTLDriver
from drivers.simulator_driver import SimulatorDriver


class TransportManager:

    def __init__(
        self,
        config: dict,
    ):

        self._config = config

        self._transport = config["transport"]

        self._driver = self._create_driver(
            self._transport
        )

    def _create_driver(
        self,
        transport: str,
    ):

        if transport == "can":

            return CANDriver(
                channel=self._config["can"]["channel"],
                bitrate=self._config["can"]["bitrate"],
                data_bitrate=self._config["can"]["data_bitrate"],
            )

        if transport == "usb_ttl":

            return USBTTLDriver(
                port=self._config["usb_ttl"]["port"],
                baudrate=self._config["usb_ttl"]["baudrate"],
            )

        if transport == "simulator":

            return SimulatorDriver()

        raise RuntimeError(
            f"Unsupported transport: {transport}"
        )
    
    def switch_transport(
        self,
        transport: str,
    ):

        if transport == self._transport:
            return True

        self._driver.disconnect()

        self._driver = self._create_driver(
            transport
        )

        connected = self._driver.connect()

        if not connected:
            return False

        self._transport = transport

        return True

    def get_driver(self):

        return self._driver

    def get_transport(self):

        return self._transport

    def connect(self):
        if self._driver.is_connected():
            return True
        return self._driver.connect()

    def disconnect(self):

        self._driver.disconnect()
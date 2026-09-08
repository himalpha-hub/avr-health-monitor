from collections import deque

from drivers.base_driver import BaseDriver

from simulation.mock_generator import MockGenerator


class SimulatorDriver(BaseDriver):

    def __init__(self):

        self.connected = False

        self.rx_queue = deque()

        self.generator = MockGenerator()

    def connect(self) -> bool:

        self.connected = True

        return True

    def disconnect(self) -> None:

        self.connected = False

        self.rx_queue.clear()

    def is_connected(self) -> bool:

        return self.connected

    def read_frame(self):

        if not self.connected:
            return None

        if not self.rx_queue:

            frames = self.generator.generate()

            self.rx_queue.extend(frames)

        return self.rx_queue.popleft()

    def send_frame(
        self,
        arbitration_id: int,
        data: bytes,
    ) -> bool:

        return True
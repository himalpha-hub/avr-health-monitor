from abc import ABC
from abc import abstractmethod


class BaseDriver(ABC):

    @abstractmethod
    def connect(self) -> bool:
        pass

    @abstractmethod
    def disconnect(self) -> None:
        pass

    @abstractmethod
    def read_frame(self):
        pass

    @abstractmethod
    def send_frame(
        self,
        arbitration_id: int,
        data: bytes,
    ) -> bool:
        pass

    @abstractmethod
    def is_connected(self) -> bool:
        pass
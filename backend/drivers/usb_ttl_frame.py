class USBTTLFrame:

    def __init__(
        self,
        arbitration_id: int,
        data: bytes,
    ):
        self.arbitration_id = arbitration_id
        self.data = data
from telemetry.models import FaultStatus

from protocol.can_ids import CANID


class FaultStatusDecoder:

    PGN = CANID.FAULT_STATUS

    @staticmethod
    def decode(data: bytes) -> FaultStatus:

        active_fault_code = int.from_bytes(
            data[0:2],
            "little",
        )

        latched_fault_code = int.from_bytes(
            data[2:4],
            "little",
        )

        fault_status_word = int.from_bytes(
            data[4:8],
            "little",
        )

        return FaultStatus(
            active_fault_code=active_fault_code,
            latched_fault_code=latched_fault_code,
            fault_status_word=fault_status_word,
            is_valid=True,
        )
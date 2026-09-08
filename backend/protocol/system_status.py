from telemetry.models import SystemStatus

from protocol.can_ids import CANID


class SystemStatusDecoder:

    PGN = CANID.SYSTEM_STATUS

    @staticmethod
    def decode(data: bytes) -> SystemStatus:

        system_state = data[0]

        unit_status_word = int.from_bytes(
            data[1:5],
            byteorder="little",
            signed=False,
        )

        run_hours = int.from_bytes(
            data[5:9],
            byteorder="little",
            signed=False,
        )

        return SystemStatus(
            system_state=system_state,
            unit_status_word=unit_status_word,
            run_hours=run_hours,
            is_valid=True,
        )
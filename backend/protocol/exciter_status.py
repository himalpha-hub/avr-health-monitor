from telemetry.models import ExciterStatus

from protocol.can_ids import CANID


class ExciterStatusDecoder:

    PGN = CANID.EXCITER_STATUS

    @staticmethod
    def decode(data: bytes) -> ExciterStatus:

        field_duty_raw = int.from_bytes(
            data[0:2],
            byteorder="little",
            signed=False,
        )

        field_current_raw = int.from_bytes(
            data[2:4],
            byteorder="little",
            signed=False,
        )

        return ExciterStatus(
            field_duty=field_duty_raw * 0.1,
            field_current=field_current_raw * 0.01,
            is_valid=True,
        )
from telemetry.models import CurrentStatus

from protocol.can_ids import CANID


class CurrentStatusDecoder:

    PGN = CANID.CURRENT_STATUS

    @staticmethod
    def decode(data: bytes) -> CurrentStatus:

        generator_current_raw = int.from_bytes(
            data[0:2],
            byteorder="little",
            signed=False,
        )

        exciter_current_raw = int.from_bytes(
            data[2:4],
            byteorder="little",
            signed=False,
        )

        output_power_raw = int.from_bytes(
            data[4:6],
            byteorder="little",
            signed=False,
        )

        derived_speed_raw = int.from_bytes(
            data[6:8],
            byteorder="little",
            signed=False,
        )

        return CurrentStatus(
            generator_current=generator_current_raw * 0.01,
            exciter_current=exciter_current_raw * 0.01,
            output_power=float(output_power_raw),
            derived_speed=derived_speed_raw,
            is_valid=True,
        )
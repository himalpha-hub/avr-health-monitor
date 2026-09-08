from telemetry.models import ThermalStatus

from protocol.can_ids import CANID


class ThermalStatusDecoder:

    PGN = CANID.THERMAL_STATUS

    @staticmethod
    def decode(data: bytes) -> ThermalStatus:

        temperature_1_raw = int.from_bytes(
            data[0:2],
            byteorder="little",
            signed=True,
        )

        temperature_2_raw = int.from_bytes(
            data[2:4],
            byteorder="little",
            signed=True,
        )

        return ThermalStatus(
            temperature_1=temperature_1_raw * 0.1,
            temperature_2=temperature_2_raw * 0.1,
            is_valid=True,
        )
from telemetry.models import ProtectionStatus

from protocol.can_ids import CANID


class ProtectionStatusDecoder:

    PGN = CANID.PROTECTION_STATUS

    @staticmethod
    def decode(data: bytes) -> ProtectionStatus:

        status_word = int.from_bytes(
            data[0:2],
            byteorder="little",
            signed=False,
        )

        return ProtectionStatus(
            under_voltage=bool(status_word & (1 << 0)),
            over_voltage=bool(status_word & (1 << 1)),
            over_current=bool(status_word & (1 << 2)),

            under_speed=bool(status_word & (1 << 3)),
            over_speed=bool(status_word & (1 << 4)),

            reverse_current=bool(status_word & (1 << 5)),

            generator_open_circuit=bool(status_word & (1 << 6)),
            generator_short_circuit=bool(status_word & (1 << 7)),

            diode_open=bool(status_word & (1 << 8)),
            diode_short=bool(status_word & (1 << 9)),

            ac_sense_fault=bool(status_word & (1 << 10)),
            dc_sense_fault=bool(status_word & (1 << 11)),

            over_temperature=bool(status_word & (1 << 12)),

            is_valid=True,
        )
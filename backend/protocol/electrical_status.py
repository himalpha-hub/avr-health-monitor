from telemetry.models import ElectricalStatus

from protocol.can_ids import CANID


class ElectricalStatusDecoder:

    PGN = CANID.ELECTRICAL_STATUS

    @staticmethod
    def decode(data: bytes) -> ElectricalStatus:

        phase_a_voltage_raw = int.from_bytes(
            data[0:2],
            byteorder="little",
            signed=False,
        )

        phase_b_voltage_raw = int.from_bytes(
            data[2:4],
            byteorder="little",
            signed=False,
        )

        phase_c_voltage_raw = int.from_bytes(
            data[4:6],
            byteorder="little",
            signed=False,
        )

        output_frequency_raw = int.from_bytes(
            data[6:8],
            byteorder="little",
            signed=False,
        )

        dc_output_voltage_raw = int.from_bytes(
            data[8:10],
            byteorder="little",
            signed=False,
        )

        return ElectricalStatus(
            phase_a_voltage=phase_a_voltage_raw * 0.01,
            phase_b_voltage=phase_b_voltage_raw * 0.01,
            phase_c_voltage=phase_c_voltage_raw * 0.01,
            output_frequency=output_frequency_raw * 0.1,
            dc_output_voltage=dc_output_voltage_raw * 0.01,
            is_valid=True,
        )
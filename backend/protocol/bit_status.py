from telemetry.models import BitStatus

from protocol.can_ids import CANID


class BitStatusDecoder:

    PGN = CANID.BIT_STATUS

    @staticmethod
    def decode(data: bytes) -> BitStatus:

        pbit_status = data[0]

        pbit_result = data[1]

        cbit_status = data[2]

        ibit_status = data[3]

        ibit_result = data[4]

        return BitStatus(
            pbit_status=pbit_status,
            pbit_result=pbit_result,
            cbit_status=cbit_status,
            ibit_status=ibit_status,
            ibit_result=ibit_result,
            is_valid=True,
        )
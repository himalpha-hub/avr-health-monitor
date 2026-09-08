from telemetry.models import HealthStatus

from protocol.can_ids import CANID


class HealthStatusDecoder:

    PGN = CANID.HEALTH_STATUS

    @staticmethod
    def decode(data: bytes) -> HealthStatus:

        return HealthStatus(
            scheduler_health=data[0],
            control_loop_health=data[1],
            reference_health=data[2],
            measurement_health=data[3],
            converter_health=data[4],
            parameter_integrity_health=data[5],
            communication_health=data[6],
            state_validity_health=data[7],
            storage_health=data[8],
            is_valid=True,
        )
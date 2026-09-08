from telemetry.telemetry_store import TelemetryStore

from protocol.can_ids import CANID

from protocol.system_status import SystemStatusDecoder
from protocol.electrical_status import ElectricalStatusDecoder
from protocol.current_status import CurrentStatusDecoder
from protocol.exciter_status import ExciterStatusDecoder
from protocol.thermal_status import ThermalStatusDecoder
from protocol.bit_status import BitStatusDecoder
from protocol.health_status import HealthStatusDecoder
from protocol.protection_status import ProtectionStatusDecoder
from protocol.fault_status import FaultStatusDecoder

class Dispatcher:

    def __init__(
        self,
        store: TelemetryStore,
    ) -> None:

        self._store = store

        self._decoder_map = {

            CANID.SYSTEM_STATUS: (
                SystemStatusDecoder,
                self._store.update_system,
            ),

            CANID.ELECTRICAL_STATUS: (
                ElectricalStatusDecoder,
                self._store.update_electrical,
            ),

            CANID.CURRENT_STATUS: (
                CurrentStatusDecoder,
                self._store.update_current,
            ),

            CANID.EXCITER_STATUS: (
                ExciterStatusDecoder,
                self._store.update_exciter,
            ),

            CANID.THERMAL_STATUS: (
                ThermalStatusDecoder,
                self._store.update_thermal,
            ),

            CANID.BIT_STATUS: (
                BitStatusDecoder,
                self._store.update_bit,
            ),

            CANID.HEALTH_STATUS: (
                HealthStatusDecoder,
                self._store.update_health,
            ),

            CANID.PROTECTION_STATUS: (
                ProtectionStatusDecoder,
                self._store.update_protection,
            ),

            CANID.FAULT_STATUS: (
                FaultStatusDecoder,
                self._store.update_fault,
            ),
        }

    def process_frame(
        self,
        frame,
    ) -> None:
        
        print(
            f"DISPATCH RX ID=0x{frame.arbitration_id:X}"
            )

        try:

            can_id = frame.arbitration_id

            entry = self._decoder_map.get(can_id)

            if entry is None:
                return

            decoder_class, update_function = entry

            decoded = decoder_class.decode(
                frame.data
            )
            print(
                f"[DISPATCH OK] "
                f"ID=0x{can_id:04X}"
)

            update_function(decoded)

        except Exception as e:

            import traceback
            traceback.print_exc()
            print(
                f"[DISPATCH ERROR] "
                f"ID=0x{frame.arbitration_id:04X} "
                f"{e}"
            )
    
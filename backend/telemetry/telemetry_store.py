from threading import Lock

from telemetry.models import (
    SystemStatus,
    ElectricalStatus,
    CurrentStatus,
    ExciterStatus,
    ThermalStatus,
    BitStatus,
    HealthStatus,
    ProtectionStatus,
    FaultStatus,
    TelemetrySnapshot,
)


class TelemetryStore:

    def __init__(self):

        self._lock = Lock()

        self.system: SystemStatus | None = None
        self.electrical: ElectricalStatus | None = None
        self.current: CurrentStatus | None = None
        self.exciter: ExciterStatus | None = None
        self.thermal: ThermalStatus | None = None

        self.bit: BitStatus | None = None
        self.health: HealthStatus | None = None

        self.protection: ProtectionStatus | None = None
        self.fault: FaultStatus | None = None

    # =====================================================
    # UPDATE METHODS
    # =====================================================

    def update_system(
        self,
        data: SystemStatus,
    ) -> None:
        
        print("SYSTEM UPDATED", data)

        with self._lock:
            self.system = data

    def update_electrical(
        self,
        data: ElectricalStatus,
    ) -> None:
        
        print("ELECTRICAL UPDATED", data)

        with self._lock:
            self.electrical = data

    def update_current(
        self,
        data: CurrentStatus,
    ) -> None:
        
        print("CURRENT UPDATED", data)

        with self._lock:
            self.current = data

    def update_exciter(
        self,
        data: ExciterStatus,
    ) -> None:
        
        print("EXCITER UPDATED", data)

        with self._lock:
            self.exciter = data

    def update_thermal(
        self,
        data: ThermalStatus,
    ) -> None:
        
        print("THERMAL UPDATED", data)

        with self._lock:
            self.thermal = data

    def update_bit(
        self,
        data: BitStatus,
    ) -> None:

        with self._lock:
            self.bit = data

    def update_health(
        self,
        data: HealthStatus,
    ) -> None:

        with self._lock:
            self.health = data

    def update_protection(
        self,
        data: ProtectionStatus,
    ) -> None:

        with self._lock:
            self.protection = data

    def update_fault(
        self,
        data: FaultStatus,
    ) -> None:

        with self._lock:
            self.fault = data

    # =====================================================
    # GET METHODS
    # =====================================================

    def get_system(self) -> SystemStatus | None:

        with self._lock:
            return self.system

    def get_electrical(self) -> ElectricalStatus | None:

        with self._lock:
            return self.electrical

    def get_current(self) -> CurrentStatus | None:

        with self._lock:
            return self.current

    def get_exciter(self) -> ExciterStatus | None:

        with self._lock:
            return self.exciter

    def get_thermal(self) -> ThermalStatus | None:

        with self._lock:
            return self.thermal

    def get_bit(self) -> BitStatus | None:

        with self._lock:
            return self.bit

    def get_health(self) -> HealthStatus | None:

        with self._lock:
            return self.health

    def get_protection(self) -> ProtectionStatus | None:

        with self._lock:
            return self.protection

    def get_fault(self) -> FaultStatus | None:

        with self._lock:
            return self.fault

    # =====================================================
    # SNAPSHOT
    # =====================================================

    def get_snapshot(
        self,
    ) -> TelemetrySnapshot | None:

        with self._lock:
            

            print(
                "\nSNAPSHOT CHECK",
                "\nsystem      =", self.system,
                "\nelectrical  =", self.electrical,
                "\ncurrent     =", self.current,
                "\nexciter     =", self.exciter,
                "\nthermal     =", self.thermal,
                "\nbit         =", self.bit,
                "\nhealth      =", self.health,
                "\nprotection  =", self.protection,
                "\nfault       =", self.fault,
            )

            if (
                self.system is None
                or self.electrical is None
                or self.current is None
                or self.exciter is None
                or self.thermal is None
                or self.bit is None
                or self.health is None
                or self.protection is None
                or self.fault is None
            ):
                return None

            return TelemetrySnapshot(
                system=self.system,
                electrical=self.electrical,
                current=self.current,
                exciter=self.exciter,
                thermal=self.thermal,
                bit=self.bit,
                health=self.health,
                protection=self.protection,
                fault=self.fault,
            )
            
    def clear(self):
        
        print("STORE CLEARED")
        with self._lock:
            self.system = None
            self.electrical = None
            self.current = None
            self.exciter = None
            self.thermal = None
            self.bit = None
            self.health = None
            self.protection = None
            self.fault = None

           
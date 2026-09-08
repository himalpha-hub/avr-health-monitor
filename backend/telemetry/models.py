from dataclasses import dataclass


# ==========================================================
# SYSTEM STATUS
# ==========================================================

@dataclass
class SystemStatus:
    system_state: int
    unit_status_word: int
    run_hours: int

    last_update_ms: int = 0
    is_valid: bool = False


# ==========================================================
# ELECTRICAL STATUS
# ==========================================================

@dataclass
class ElectricalStatus:
    phase_a_voltage: float
    phase_b_voltage: float
    phase_c_voltage: float

    output_frequency: float
    dc_output_voltage: float

    last_update_ms: int = 0
    is_valid: bool = False


# ==========================================================
# CURRENT STATUS
# ==========================================================

@dataclass
class CurrentStatus:
    generator_current: float
    exciter_current: float

    output_power: float
    derived_speed: int

    last_update_ms: int = 0
    is_valid: bool = False


# ==========================================================
# EXCITER STATUS
# ==========================================================

@dataclass
class ExciterStatus:
    field_duty: float
    field_current: float

    last_update_ms: int = 0
    is_valid: bool = False


# ==========================================================
# THERMAL STATUS
# ==========================================================

@dataclass
class ThermalStatus:
    temperature_1: float
    temperature_2: float

    last_update_ms: int = 0
    is_valid: bool = False


# ==========================================================
# BIT STATUS
# ==========================================================

@dataclass
class BitStatus:
    pbit_status: int
    pbit_result: int

    cbit_status: int

    ibit_status: int
    ibit_result: int

    last_update_ms: int = 0
    is_valid: bool = False


# ==========================================================
# HEALTH STATUS
# ==========================================================

@dataclass
class HealthStatus:
    scheduler_health: int
    control_loop_health: int
    reference_health: int
    measurement_health: int
    converter_health: int
    parameter_integrity_health: int
    communication_health: int
    state_validity_health: int
    storage_health: int

    last_update_ms: int = 0
    is_valid: bool = False


# ==========================================================
# PROTECTION STATUS
# ==========================================================

@dataclass
class ProtectionStatus:
    under_voltage: bool
    over_voltage: bool
    over_current: bool

    under_speed: bool
    over_speed: bool

    reverse_current: bool

    generator_open_circuit: bool
    generator_short_circuit: bool

    diode_open: bool
    diode_short: bool

    ac_sense_fault: bool
    dc_sense_fault: bool

    over_temperature: bool

    last_update_ms: int = 0
    is_valid: bool = False


# ==========================================================
# FAULT STATUS
# ==========================================================

@dataclass
class FaultStatus:
    active_fault_code: int
    latched_fault_code: int

    fault_status_word: int

    last_update_ms: int = 0
    is_valid: bool = False


# ==========================================================
# COMPLETE TELEMETRY SNAPSHOT
# ==========================================================

@dataclass
class TelemetrySnapshot:
    system: SystemStatus
    electrical: ElectricalStatus
    current: CurrentStatus
    exciter: ExciterStatus
    thermal: ThermalStatus

    bit: BitStatus
    health: HealthStatus

    protection: ProtectionStatus
    fault: FaultStatus
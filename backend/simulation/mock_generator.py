import random
import struct
import time


SYSTEM_STATUS_ID = 0xFF00
ELECTRICAL_STATUS_ID = 0xFF01
CURRENT_STATUS_ID = 0xFF02
EXCITER_STATUS_ID = 0xFF03
THERMAL_STATUS_ID = 0xFF04
BIT_STATUS_ID = 0xFF05
HEALTH_STATUS_ID = 0xFF06
PROTECTION_STATUS_ID = 0xFF07
FAULT_STATUS_ID = 0xFF08


class MockFrame:

    def __init__(
        self,
        arbitration_id: int,
        data: bytes,
    ) -> None:

        self.arbitration_id = arbitration_id
        self.data = data


class MockGenerator:

    def __init__(self) -> None:

        self._run_hours = 100

    # =====================================================
    # SYSTEM
    # =====================================================

    def system_status(self):

        system_state = 1
        status_word = 0x00000001

        payload = struct.pack(
            "<BII",
            system_state,
            status_word,
            self._run_hours,
        )

        return MockFrame(
            SYSTEM_STATUS_ID,
            payload,
        )

    # =====================================================
    # ELECTRICAL
    # =====================================================

    def electrical_status(self):

        phase_a = int(
            random.uniform(229.5, 231.5) * 100
        )

        phase_b = int(
            random.uniform(229.5, 231.5) * 100
        )

        phase_c = int(
            random.uniform(229.5, 231.5) * 100
        )

        frequency = int(
            random.uniform(399.0, 401.0)
        )

        dc_voltage = int(
            random.uniform(27.7, 28.3) * 100
        )

        payload = struct.pack(
            "<HHHHH",
            phase_a,
            phase_b,
            phase_c,
            frequency,
            dc_voltage,
        )

        return MockFrame(
            ELECTRICAL_STATUS_ID,
            payload,
        )

    # =====================================================
    # CURRENT
    # =====================================================

    def current_status(self):

        generator_current = int(
            random.uniform(100.0, 300.0) * 100
        )

        exciter_current = int(
            random.uniform(1.0, 5.0) * 100
        )

        output_power = int(
            random.uniform(20000, 30000)
        )

        speed = int(
            random.uniform(4500, 5500)
        )

        payload = struct.pack(
            "<HHHH",
            generator_current,
            exciter_current,
            output_power,
            speed,
        )

        return MockFrame(
            CURRENT_STATUS_ID,
            payload,
        )

    # =====================================================
    # EXCITER
    # =====================================================

    def exciter_status(self):

        duty = int(
            random.uniform(35, 55) * 10
        )

        current = int(
            random.uniform(1.0, 5.0) * 100
        )

        payload = struct.pack(
            "<HH",
            duty,
            current,
        )

        return MockFrame(
            EXCITER_STATUS_ID,
            payload,
        )

    # =====================================================
    # THERMAL
    # =====================================================

    def thermal_status(self):

        temp1 = int(
            random.uniform(40, 50) * 10
        )

        temp2 = int(
            random.uniform(38, 48) * 10
        )

        payload = struct.pack(
            "<hh",
            temp1,
            temp2,
        )

        return MockFrame(
            THERMAL_STATUS_ID,
            payload,
        )

    # =====================================================
    # BIT
    # =====================================================

    def bit_status(self):

        payload = struct.pack(
            "<BBBBB",
            1,
            1,
            1,
            1,
            1,
        )

        return MockFrame(
            BIT_STATUS_ID,
            payload,
        )

    # =====================================================
    # HEALTH
    # =====================================================

    def health_status(self):

        payload = struct.pack(
            "<BBBBBBBBB",
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
        )

        return MockFrame(
            HEALTH_STATUS_ID,
            payload,
        )

    # =====================================================
    # PROTECTION
    # =====================================================

    def protection_status(self):

        payload = bytes([0])

        return MockFrame(
            PROTECTION_STATUS_ID,
            payload,
        )

    # =====================================================
    # FAULT
    # =====================================================

    def fault_status(self):

        payload = struct.pack(
            "<HHI",
            0,
            0,
            0,
        )

        return MockFrame(
            FAULT_STATUS_ID,
            payload,
        )

    # =====================================================
    # GENERATE ALL
    # =====================================================

    def generate(self):

        self._run_hours += 1

        return [
            self.system_status(),
            self.electrical_status(),
            self.current_status(),
            self.exciter_status(),
            self.thermal_status(),
            self.bit_status(),
            self.health_status(),
            self.protection_status(),
            self.fault_status(),
        ]
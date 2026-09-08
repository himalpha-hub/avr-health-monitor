import time

from telemetry.telemetry_store import TelemetryStore


FAST_TIMEOUT_MS = 300
MEDIUM_TIMEOUT_MS = 1500
SLOW_TIMEOUT_MS = 3000


class FreshnessMonitor:

    def __init__(
        self,
        store: TelemetryStore,
    ) -> None:

        self._store = store

    def run(self) -> None:

        now_ms = int(time.time() * 1000)

        self._update_validity(
            self._store.get_system(),
            now_ms,
            FAST_TIMEOUT_MS,
        )

        self._update_validity(
            self._store.get_electrical(),
            now_ms,
            FAST_TIMEOUT_MS,
        )

        self._update_validity(
            self._store.get_current(),
            now_ms,
            FAST_TIMEOUT_MS,
        )

        self._update_validity(
            self._store.get_exciter(),
            now_ms,
            FAST_TIMEOUT_MS,
        )

        self._update_validity(
            self._store.get_thermal(),
            now_ms,
            MEDIUM_TIMEOUT_MS,
        )

        self._update_validity(
            self._store.get_bit(),
            now_ms,
            SLOW_TIMEOUT_MS,
        )

        self._update_validity(
            self._store.get_health(),
            now_ms,
            SLOW_TIMEOUT_MS,
        )

        self._update_validity(
            self._store.get_protection(),
            now_ms,
            FAST_TIMEOUT_MS,
        )

        self._update_validity(
            self._store.get_fault(),
            now_ms,
            FAST_TIMEOUT_MS,
        )

    def _update_validity(
        self,
        data,
        now_ms: int,
        timeout_ms: int,
    ) -> None:

        if data is None:
            return

        data.is_valid = (
            now_ms - data.last_update_ms
        ) <= timeout_ms
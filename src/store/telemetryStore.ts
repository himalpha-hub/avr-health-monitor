import { create } from "zustand";

interface TelemetryState {
  telemetry: any;

  setTelemetry: (data: any) => void;

  clearTelemetry: () => void;
}

export const useTelemetryStore =
  create<TelemetryState>((set) => ({
    telemetry: null,

    setTelemetry: (data) =>
      set({
        telemetry: data,
      }),

    clearTelemetry: () =>
      set({
        telemetry: null,
      }),
  }));
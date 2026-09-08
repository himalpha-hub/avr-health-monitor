import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import HealthStatus from "./pages/HealthStatus/HealthStatus";
import FaultMonitor from "./pages/FaultMonitor/FaultMonitor";
import Configuration from "./pages/Configuration/Configuration";
import RecordsLogs from "./pages/RecordsLogs/RecordsLogs";
import Communication from "./pages/Communication/Communication";

import { TelemetrySocket } from "./services/websocket";
import { useTelemetryStore } from "./store/telemetryStore";

function App() {

  const setTelemetry =
    useTelemetryStore(
      (state) => state.setTelemetry
    );

  useEffect(() => {

    const ws = new TelemetrySocket();

    ws.connect((data) => {

      console.log(
        "Telemetry RX:",
        data
      );

      setTelemetry(data);

    });

    return () => {

      ws.disconnect();

    };

  }, [setTelemetry]);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/health"
            element={<HealthStatus />}
          />

          <Route
            path="/faults"
            element={<FaultMonitor />}
          />

          <Route
            path="/communication"
            element={<Communication />}
          />

          <Route
            path="/config"
            element={<Configuration />}
          />

          <Route
            path="/logs"
            element={<RecordsLogs />}
          />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
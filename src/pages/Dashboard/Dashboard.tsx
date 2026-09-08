import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Box, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";




import type { TrendType } from "./types/trend.types";

import TrendDrawer from "./components/TrendDrawer";

import MeasurementRow from "./components/MeasurementRow";
import MeasurementSection from "./components/MeasurementSection";

import { useTelemetryStore }
  from "../../store/telemetryStore";




export default function Dashboard() {
  const [trendOpen, setTrendOpen] =
    useState(false);

  const telemetry =
    useTelemetryStore(
      (s) => s.telemetry
    );
  const isConnected = telemetry !== null;
  console.log(
    "Dashboard Telemetry:",
    telemetry
  );

  const system = telemetry?.system;
  const electrical = telemetry?.electrical;
  const current = telemetry?.current;
  const exciter = telemetry?.exciter;
  const thermal = telemetry?.thermal;
  const health = telemetry?.health;

  const [electricalHistory, setElectricalHistory] =
    useState<any[]>([]);

  const [currentHistory, setCurrentHistory] =
    useState<any[]>([]);

  const [exciterHistory, setExciterHistory] =
    useState<any[]>([]);

  const [temperatureHistory, setTemperatureHistory] =
    useState<any[]>([]);

  useEffect(() => {

    if (!telemetry) return;

    const timestamp =
      new Date().toLocaleTimeString();

    setElectricalHistory((prev) => {

      const next = [
        ...prev,
        {
          time: timestamp,

          phaseA:
            telemetry.electrical.phase_a_voltage,

          phaseB:
            telemetry.electrical.phase_b_voltage,

          phaseC:
            telemetry.electrical.phase_c_voltage,
        },
      ];

      return next.slice(-60);

    });

    setCurrentHistory((prev) => {

      const next = [
        ...prev,
        {
          time: timestamp,

          generator:
            telemetry.current.generator_current,

          exciter:
            telemetry.current.exciter_current,

          power:
            telemetry.current.output_power,
        },
      ];

      return next.slice(-60);

    });

    setExciterHistory((prev) => {

      const next = [
        ...prev,
        {
          time: timestamp,

          duty:
            telemetry.exciter.field_duty,

          fieldCurrent:
            telemetry.exciter.field_current,
        },
      ];

      return next.slice(-60);

    });

    setTemperatureHistory((prev) => {

      console.log(
        "TEMP RAW:",
        telemetry.thermal.temperature_1,
        telemetry.thermal.temperature_2
      );

      const next = [
        ...prev,
        {
          time: timestamp,

          temp1:
            telemetry.thermal.temperature_1,

          temp2:
            telemetry.thermal.temperature_2,
        },
      ];

      return next.slice(-60);

    });

  }, [telemetry]);

  const handleOpenTrend = () => {

    setTrendOpen(true);

  };


  const [activeTrend, setActiveTrend] =
    useState<TrendType>("electrical");




  // graph


  // current


  // exciter data


  // temperature data

  const handleCloseTrend = () => {
    setTrendOpen(false);
  };
  return (
    <Box sx={{ p: 3 }}>
      {/* PAGE TITLE */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Live Monitoring
      </Typography>

      {/* STATUS BAR */}

      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">System State</Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#0F4C81",
              }}
            >
              {system?.system_state ?? "--"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">Run Hours</Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
              }}
            >
              {system?.run_hours ?? "--"} h
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">
              Communication
            </Typography>

            <Chip
              color={
                isConnected
                  ? "success"
                  : "error"
              }
              label={
                isConnected
                  ? "ONLINE"
                  : "OFFLINE"
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">Health</Typography>

            <Chip
              color="primary"
              label={
                health?.communication_health
                  ? "HEALTHY"
                  : "CHECK"
              }
            />
          </Grid>
        </Grid>
      </Paper>

      {/* MAIN PANELS */}

      <Grid container spacing={3}>
        {/* ELECTRICAL */}

        <Grid size={{ xs: 12, md: 6 }}>
          <MeasurementSection
            title="ELECTRICAL MEASUREMENTS"
            action={
              <Button
                size="small"
                startIcon={<ShowChartIcon />}
                variant="outlined"
                onClick={() => {
                  setActiveTrend("electrical");
                  handleOpenTrend();
                }}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.4)",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontWeight: 600,

                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Trends
              </Button>
            }
          >
            <MeasurementRow label="Phase A Voltage" value={
              electrical?.phase_a_voltage
                ?.toFixed(1) ?? "--"
            } unit="V" />

            <MeasurementRow label="Phase B Voltage" value={
              electrical?.phase_b_voltage
                ?.toFixed(1) ?? "--"
            } unit="V" />

            <MeasurementRow label="Phase C Voltage" value={
              electrical?.phase_c_voltage
                ?.toFixed(1) ?? "--"
            } unit="V" />

            <MeasurementRow label="DC Output Voltage" value={
              electrical?.dc_output_voltage
                ?.toFixed(1) ?? "--"
            } unit="V" />

            <MeasurementRow label="Output Frequency" value={
              electrical?.output_frequency
                ?.toFixed(1) ?? "--"
            } unit="Hz" />
          </MeasurementSection>
        </Grid>

        {/* CURRENT */}

        {/* CURRENT / POWER */}

        <Grid size={{ xs: 12, md: 6 }}>
          <MeasurementSection
            title="CURRENT / POWER"
            action={
              <Button
                size="small"
                startIcon={<ShowChartIcon />}
                variant="outlined"
                onClick={() => {
                  setActiveTrend("current");
                  handleOpenTrend();
                }}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.4)",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontWeight: 600,

                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Trends
              </Button>
            }
          >
            <MeasurementRow
              label="Generator Current"
              value={
                current?.generator_current?.toFixed(1) ?? "--"
              }
              unit="A"
            />

            <MeasurementRow
              label="Exciter Current"
              value={
                current?.exciter_current?.toFixed(1) ?? "--"
              }
              unit="A"
            />

            <MeasurementRow
              label="Output Power"
              value={
                current?.output_power?.toFixed(0) ?? "--"
              }
              unit="W"
            />

            <MeasurementRow
              label="Derived Speed"
              value={
                current?.derived_speed?.toFixed(0) ?? "--"
              }
              unit="RPM"
            />
          </MeasurementSection>
        </Grid>

        {/* EXCITER */}

        <Grid size={{ xs: 12, md: 6 }}>
          <MeasurementSection
            title="EXCITER"
            action={
              <Button
                size="small"
                startIcon={<ShowChartIcon />}
                variant="outlined"
                onClick={() => {
                  setActiveTrend("exciter");
                  handleOpenTrend();
                }}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.4)",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontWeight: 600,

                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Trends
              </Button>
            }
          >
            <MeasurementRow
              label="Field Duty"
              value={
                exciter?.field_duty?.toFixed(1) ?? "--"
              }
              unit="%"
            />

            <MeasurementRow
              label="Field Current"
              value={
                exciter?.field_current?.toFixed(2) ?? "--"
              }
              unit="A"
            />
          </MeasurementSection>
        </Grid>


        {/* TEMPERATURE */}

        <Grid size={{ xs: 12, md: 6 }}>
          <MeasurementSection
            title="TEMPERATURE"
            action={
              <Button
                size="small"
                startIcon={<ShowChartIcon />}
                variant="outlined"
                onClick={() => {
                  setActiveTrend("temperature");
                  handleOpenTrend();
                }}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.4)",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontWeight: 600,

                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Trends
              </Button>
            }
          >
            <MeasurementRow
              label="Temperature 1"
              value={
                thermal?.temperature_1?.toFixed(1) ?? "--"
              }
              unit="°C"
            />

            <MeasurementRow
              label="Temperature 2"
              value={
                thermal?.temperature_2?.toFixed(1) ?? "--"
              }
              unit="°C"
            />
          </MeasurementSection>
        </Grid>
      </Grid>

      {/* drawer  */}


      <TrendDrawer
        open={trendOpen}
        onClose={handleCloseTrend}
        activeTrend={activeTrend}

        electricalHistory={
          electricalHistory
        }

        currentHistory={
          currentHistory
        }

        exciterHistory={
          exciterHistory
        }

        temperatureHistory={
          temperatureHistory
        }
      />

      {/* FOOTER */}

      <Paper
        elevation={1}
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          Refresh Rate
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          100 ms
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" color="text.secondary">
          Live Monitoring View
        </Typography>
      </Paper>
    </Box>
  );
}

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import StatusCard from "../components/cards/StatusCard";
import MetricCard from "../components/cards/MetricCard";

export default function ContentArea() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Dashboard
      </Typography>

      {/* STATUS STRIP */}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatusCard
            title="System State"
            value="READY"
            color="primary"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatusCard
            title="Communication"
            value="ONLINE"
            color="success"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatusCard
            title="BIT Status"
            value="PASS"
            color="success"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatusCard
            title="Fault Status"
            value="NONE"
            color="success"
          />
        </Grid>
      </Grid>

      {/* ELECTRICAL */}

      <Typography
        variant="h6"
        sx={{ mt: 4, mb: 2 }}
      >
        Electrical Measurements
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Phase A"
            value="230.1"
            unit="V"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Phase B"
            value="229.8"
            unit="V"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Phase C"
            value="230.4"
            unit="V"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Frequency"
            value="50.0"
            unit="Hz"
          />
        </Grid>
      </Grid>

      {/* CURRENT */}

      <Typography
        variant="h6"
        sx={{ mt: 4, mb: 2 }}
      >
        Current & Power
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Generator Current"
            value="12.3"
            unit="A"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Exciter Current"
            value="1.8"
            unit="A"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Output Power"
            value="4.5"
            unit="kW"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Derived Speed"
            value="1500"
            unit="RPM"
          />
        </Grid>
      </Grid>

      {/* PROTECTION */}

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6">
            Protection Matrix
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            Under Voltage | Over Voltage |
            Over Current | Reverse Current
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Generator Open | Generator
            Short | AC Sense | DC Sense
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Over Temperature | Under Speed
            | Over Speed
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
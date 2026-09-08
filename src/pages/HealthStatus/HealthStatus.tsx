import {
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

const StatusRow = ({
  label,
  value,
  healthy = true,
}: {
  label: string;
  value: string;
  healthy?: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 1,
      borderBottom: "1px solid #E5E7EB",
    }}
  >
    <Typography>{label}</Typography>

    <Chip
      label={value}
      color={healthy ? "success" : "error"}
      size="small"
    />
  </Box>
);

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      py: 1,
      borderBottom: "1px solid #E5E7EB",
    }}
  >
    <Typography>{label}</Typography>

    <Typography
      sx={{
        fontWeight: 600,
      }}
    >
      {value}
    </Typography>
  </Box>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Paper
    elevation={1}
    sx={{
      borderRadius: 2,
      overflow: "hidden",
      height: "100%",
    }}
  >
    <Box
      sx={{
        backgroundColor: "#0F4C81",
        color: "white",
        px: 2,
        py: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Typography>
    </Box>

    <Box sx={{ p: 2 }}>{children}</Box>
  </Paper>
);

export default function HealthStatus() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Health & Status
      </Typography>

      {/* UNIT STATUS */}

      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 700,
          }}
        >
          Unit Status
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <InfoRow
              label="System State"
              value="READY"
            />

            <InfoRow
              label="Unit Status Word"
              value="0x00000000"
            />

            <InfoRow
              label="Overall Health"
              value="HEALTHY"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InfoRow
              label="Run Hours"
              value="1254 h"
            />

            <InfoRow
              label="Last Reset Cause"
              value="Power On Reset"
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* PBIT */}

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="PBIT RESULTS">
            <StatusRow
              label="RAM Test"
              value="PASS"
            />

            <StatusRow
              label="Flash CRC"
              value="PASS"
            />

            <StatusRow
              label="ADC Self Test"
              value="PASS"
            />

            <StatusRow
              label="PWM Self Test"
              value="PASS"
            />

            <StatusRow
              label="NVM Integrity"
              value="PASS"
            />

            <StatusRow
              label="Sensor Interface"
              value="PASS"
            />

            <StatusRow
              label="Communication Init"
              value="PASS"
            />

            <Divider sx={{ my: 2 }} />

            <Chip
              label="PBIT RESULT : PASS"
              color="success"
            />
          </Section>
        </Grid>

        {/* COMM */}

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="COMMUNICATION HEALTH">
            <InfoRow
              label="CAN State"
              value="ONLINE"
            />

            <InfoRow
              label="Tx Messages"
              value="124567"
            />

            <InfoRow
              label="Rx Messages"
              value="124510"
            />

            <InfoRow
              label="Tx Errors"
              value="0"
            />

            <InfoRow
              label="Rx Errors"
              value="0"
            />

            <InfoRow
              label="Bus Off Count"
              value="0"
            />

            <InfoRow
              label="Lost Frames"
              value="0"
            />

            <InfoRow
              label="Last Comm Fault"
              value="NONE"
            />
          </Section>
        </Grid>

        {/* CBIT */}

        <Grid size={{ xs: 12 }}>
          <Section title="CBIT HEALTH MATRIX">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <StatusRow
                  label="Scheduler Health"
                  value="PASS"
                />

                <StatusRow
                  label="Control Loop Health"
                  value="PASS"
                />

                <StatusRow
                  label="Reference Health"
                  value="PASS"
                />

                <StatusRow
                  label="Measurement Health"
                  value="PASS"
                />

                <StatusRow
                  label="Converter Health"
                  value="PASS"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <StatusRow
                  label="Parameter Integrity"
                  value="PASS"
                />

                <StatusRow
                  label="Communication Health"
                  value="PASS"
                />

                <StatusRow
                  label="State Validity Health"
                  value="PASS"
                />

                <StatusRow
                  label="Storage Health"
                  value="PASS"
                />
              </Grid>
            </Grid>
          </Section>
        </Grid>

        {/* STORAGE */}

        <Grid size={{ xs: 12 }}>
          <Section title="STORAGE STATUS">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InfoRow
                  label="NVM Status"
                  value="OK"
                />

                <InfoRow
                  label="Parameter CRC"
                  value="VALID"
                />

                <InfoRow
                  label="Fault Log Memory"
                  value="OK"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <InfoRow
                  label="Storage Usage"
                  value="32 %"
                />

                <InfoRow
                  label="Last Write Time"
                  value="12:41:32"
                />

                <InfoRow
                  label="Wear Level"
                  value="NORMAL"
                />
              </Grid>
            </Grid>
          </Section>
        </Grid>
      </Grid>
    </Box>
  );
}
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #D7DEE7",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 700,
          color: "#0F4C81",
          mb: 3,
        }}
      >
        {title}
      </Typography>

      {children}
    </Paper>
  );
}

export default function Configuration() {
  return (
    <Box sx={{ p: 4 }}>
      {/* PAGE TITLE */}

      <Typography
        sx={{
          fontSize: 34,
          fontWeight: 700,
          mb: 3,
        }}
      >
        Configuration Management
      </Typography>

      {/* AUTHORITY */}

      <Section title="Configuration Authority">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Chip
              label="STATE : STANDBY"
              color="primary"
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Chip
              label="WRITE ENABLED"
              color="success"
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Chip
              label="COMM HEALTHY"
              color="success"
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Chip
              label="CONFIG UNLOCKED"
              color="success"
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Section>

      {/* PARAMS + THRESHOLDS */}

      <Grid
  container
  spacing={3}
  sx={{ mt: 1 }}
>
        {/* TUNABLE PARAMETERS */}

        <Grid size={{ xs: 12, lg: 6 }}>
          <Section title="Tunable Parameters">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Parameter
                  </TableCell>
                  <TableCell>
                    Current
                  </TableCell>
                  <TableCell>
                    New Value
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>
                    DC Voltage Setpoint
                  </TableCell>

                  <TableCell>
                    28.0 V
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="28.5"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Frequency Setpoint
                  </TableCell>

                  <TableCell>
                    50 Hz
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="50"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Field Duty Limit
                  </TableCell>

                  <TableCell>
                    60 %
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="65"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Field Current Limit
                  </TableCell>

                  <TableCell>
                    2.0 A
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="2.2"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Speed Calibration
                  </TableCell>

                  <TableCell>
                    1.00
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="1.02"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
              >
                WRITE PARAMETERS
              </Button>
            </Box>
          </Section>
        </Grid>

        {/* THRESHOLDS */}

        <Grid size={{ xs: 12, lg: 6 }}>
          <Section title="Protection Thresholds">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Threshold
                  </TableCell>

                  <TableCell>
                    Current
                  </TableCell>

                  <TableCell>
                    New Value
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>
                    Under Voltage
                  </TableCell>

                  <TableCell>
                    20 V
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="20"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Over Voltage
                  </TableCell>

                  <TableCell>
                    32 V
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="32"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Over Current
                  </TableCell>

                  <TableCell>
                    15 A
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="15"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Under Speed
                  </TableCell>

                  <TableCell>
                    1200 RPM
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="1200"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Over Speed
                  </TableCell>

                  <TableCell>
                    1800 RPM
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="1800"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Over Temperature
                  </TableCell>

                  <TableCell>
                    90 °C
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue="90"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                size="large"
              >
                WRITE THRESHOLDS
              </Button>
            </Box>
          </Section>
        </Grid>
      </Grid>

      {/* READBACK */}

      <Box sx={{ mt: 3 }}>
        <Section title="Write Readback Confirmation">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Parameter
                </TableCell>

                <TableCell>
                  Requested
                </TableCell>

                <TableCell>
                  Readback
                </TableCell>

                <TableCell>
                  Result
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  DC Voltage Setpoint
                </TableCell>

                <TableCell>
                  28.5
                </TableCell>

                <TableCell>
                  28.5
                </TableCell>

                <TableCell>
                  <Chip
                    label="PASS"
                    color="success"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  Over Voltage
                </TableCell>

                <TableCell>
                  32
                </TableCell>

                <TableCell>
                  32
                </TableCell>

                <TableCell>
                  <Chip
                    label="PASS"
                    color="success"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  Over Current
                </TableCell>

                <TableCell>
                  15
                </TableCell>

                <TableCell>
                  15
                </TableCell>

                <TableCell>
                  <Chip
                    label="PASS"
                    color="success"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  Field Duty Limit
                </TableCell>

                <TableCell>
                  65
                </TableCell>

                <TableCell>
                  65
                </TableCell>

                <TableCell>
                  <Chip
                    label="PASS"
                    color="success"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>
      </Box>
    </Box>
  );
}
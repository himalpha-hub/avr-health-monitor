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

export default function RecordsLogs() {
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
        Records & Logs
      </Typography>

      {/* EXPORT OPERATIONS */}

      <Section title="Export Operations">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
            >
              Live Data
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
            >
              Fault Log
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
            >
              BIT History
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 2.4 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
            >
              Configuration
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 2.4 }}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              size="large"
            >
              Full Report
            </Button>
          </Grid>
        </Grid>
      </Section>

      {/* EXPORT STATUS */}

      <Box sx={{ mt: 3 }}>
        <Section title="Export Status">
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography color="text.secondary">
                Last Export Time
              </Typography>

              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                12:45:33
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography color="text.secondary">
                Records Exported
              </Typography>

              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                125
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography color="text.secondary">
                Last File
              </Typography>

              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                AVR_Report.csv
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography color="text.secondary">
                Status
              </Typography>

              <Chip
                label="SUCCESS"
                color="success"
              />
            </Grid>
          </Grid>
        </Section>
      </Box>

      {/* FAULT HISTORY */}

      <Box sx={{ mt: 3 }}>
        <Section title="Stored Fault History">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Fault</TableCell>
                <TableCell>Captured Value</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>12:41:23</TableCell>
                <TableCell>Over Voltage</TableCell>
                <TableCell>31.8 V</TableCell>
                <TableCell>
                  <Chip
                    label="ACTIVE"
                    color="error"
                    size="small"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>09:12:44</TableCell>
                <TableCell>Under Voltage</TableCell>
                <TableCell>17.5 V</TableCell>
                <TableCell>
                  <Chip
                    label="LATCHED"
                    color="warning"
                    size="small"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>08:01:15</TableCell>
                <TableCell>Over Current</TableCell>
                <TableCell>15.6 A</TableCell>
                <TableCell>
                  <Chip
                    label="CLEARED"
                    color="success"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>
      </Box>

      {/* BIT HISTORY */}

      <Box sx={{ mt: 3 }}>
        <Section title="BIT History">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>BIT Type</TableCell>
                <TableCell>Result</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>12:05:00</TableCell>
                <TableCell>CBIT</TableCell>
                <TableCell>
                  <Chip
                    label="PASS"
                    color="success"
                    size="small"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>09:05:00</TableCell>
                <TableCell>IBIT</TableCell>
                <TableCell>
                  <Chip
                    label="PASS"
                    color="success"
                    size="small"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>08:00:00</TableCell>
                <TableCell>PBIT</TableCell>
                <TableCell>
                  <Chip
                    label="PASS"
                    color="success"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>
      </Box>

      {/* CONFIG CHANGE HISTORY */}

      <Box sx={{ mt: 3 }}>
        <Section title="Configuration Change History">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Parameter</TableCell>
                <TableCell>Old Value</TableCell>
                <TableCell>New Value</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>12:40:11</TableCell>
                <TableCell>Voltage Setpoint</TableCell>
                <TableCell>28.0</TableCell>
                <TableCell>28.5</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>10:12:30</TableCell>
                <TableCell>Over Voltage Threshold</TableCell>
                <TableCell>31</TableCell>
                <TableCell>32</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>08:15:20</TableCell>
                <TableCell>Field Duty Limit</TableCell>
                <TableCell>60%</TableCell>
                <TableCell>65%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>
      </Box>
    </Box>
  );
}
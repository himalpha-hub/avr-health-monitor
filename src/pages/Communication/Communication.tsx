import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

function Panel({
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
          fontSize: 18,
          fontWeight: 700,
          mb: 2,
          color: "#0F4C81",
        }}
      >
        {title}
      </Typography>

      {children}
    </Paper>
  );
}

export default function Communication() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{
          fontSize: 34,
          fontWeight: 700,
          mb: 3,
        }}
      >
        Command & Control
      </Typography>

      {/* STATUS BAR */}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #D7DEE7",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Chip
              label="STATE : READY"
              color="success"
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Chip
              label="COMM : HEALTHY"
              color="success"
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Chip
              label="FAULT : NONE"
              color="success"
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Chip
              label="AUTHORITY : VALID"
              color="primary"
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* COMMANDS */}

      <Panel title="Operator Commands">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              size="large"
            >
              ENABLE
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              size="large"
            >
              DISABLE
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="large"
            >
              FAULT RESET
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
            >
              START IBIT
            </Button>
          </Grid>
        </Grid>
      </Panel>

      <Grid
  container
  spacing={3}
  sx={{ mt: 1 }}
>
        {/* SETPOINT */}

        <Grid size={{ xs: 12, lg: 6 }}>
          <Panel title="Voltage Setpoint Control">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#64748B",
                    mb: 1,
                  }}
                >
                  Current Setpoint
                </Typography>

                <Typography
                  sx={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#0F4C81",
                    mb: 3,
                  }}
                >
                  28.0 V
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label="New Setpoint"
                  defaultValue="28.5"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ height: "56px" }}
                >
                  APPLY
                </Button>
              </Grid>
            </Grid>
          </Panel>
        </Grid>

        {/* MODE */}

        <Grid size={{ xs: 12, lg: 6 }}>
          <Panel title="Mode Selection">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  select
                  defaultValue="AUTO"
                  label="Operating Mode"
                >
                  <MenuItem value="AUTO">
                    Automatic
                  </MenuItem>

                  <MenuItem value="MANUAL">
                    Manual
                  </MenuItem>

                  <MenuItem value="STANDBY">
                    Standby
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  fullWidth
                  variant="contained"
                >
                  APPLY MODE
                </Button>
              </Grid>
            </Grid>
          </Panel>
        </Grid>
      </Grid>

      {/* IBIT */}

      <Grid
  container
  spacing={3}
  sx={{ mt: 1 }}
>
        <Grid size={{ xs: 12 }}>
          <Panel title="IBIT Status">
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography color="text.secondary">
                  Current Status
                </Typography>

                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 700,
                  }}
                >
                  IDLE
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography color="text.secondary">
                  Last Result
                </Typography>

                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "green",
                  }}
                >
                  PASS
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography color="text.secondary">
                  Last Execution
                </Typography>

                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 700,
                  }}
                >
                  09:05
                </Typography>
              </Grid>
            </Grid>
          </Panel>
        </Grid>
      </Grid>

      {/* HISTORY */}

      <Box sx={{ mt: 3 }}>
        <Panel title="Command History">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Time
                </TableCell>

                <TableCell>
                  Command
                </TableCell>

                <TableCell>
                  Result
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  12:45:11
                </TableCell>

                <TableCell>
                  Voltage Setpoint Changed
                </TableCell>

                <TableCell>
                  Success
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  12:40:03
                </TableCell>

                <TableCell>
                  Enable Command
                </TableCell>

                <TableCell>
                  Success
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  11:18:44
                </TableCell>

                <TableCell>
                  Fault Reset
                </TableCell>

                <TableCell>
                  Success
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  09:05:22
                </TableCell>

                <TableCell>
                  IBIT Request
                </TableCell>

                <TableCell>
                  Success
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Panel>
      </Box>
    </Box>
  );
}
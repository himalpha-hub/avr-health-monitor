import {
  Box,
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

const protectionSignals = [
  "Under Voltage",
  "Over Voltage",
  "Over Current",
  "Under Speed",
  "Over Speed",
  "Reverse Current",
  "Generator Open Circuit",
  "Generator Short Circuit",
  "Diode Open",
  "Diode Short",
  "AC Sense Fault",
  "DC Sense Fault",
  "Over Temperature",
];

const ProtectionIndicator = ({
  name,
  active = false,
}: {
  name: string;
  active?: boolean;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 1.5,
      border: "1px solid #E5E7EB",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Typography variant="body2">{name}</Typography>

    <Chip
      size="small"
      label={active ? "FAULT" : "OK"}
      color={active ? "error" : "success"}
    />
  </Paper>
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
      alignItems: "center",
      py: 1.8,
      borderBottom: "1px solid #E5E7EB",
    }}
  >
    <Typography
      sx={{
        width: 240,
        color: "#475569",
        fontWeight: 500,
      }}
    >
      {label}
    </Typography>

    <Typography
      sx={{
        color: "#0F172A",
        fontWeight: 700,
      }}
    >
      :
    </Typography>

    <Typography
      sx={{
        ml: 3,
        color: "#0F172A",
        fontWeight: 700,
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
      border: "1px solid #D6DCE5",
    }}
  >
    <Box
      sx={{
        backgroundColor: "#0F4C81",
        color: "#FFFFFF",
        px: 2,
        py: 1.2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: "0.4px",
        }}
      >
        {title}
      </Typography>
    </Box>

    <Box
      sx={{
        px: 3,
        py: 0,
      }}
    >
      {children}
    </Box>
  </Paper>
);

export default function FaultMonitor() {
  return (
    <Box sx={{ p: 3 }}>
      

      {/* PROTECTION MATRIX */}

      <Section title="PROTECTION STATUS">
        <Grid container spacing={2}>
          {protectionSignals.map((item) => (
            <Grid
              key={item}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <ProtectionIndicator name={item} />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* ACTIVE FAULT */}

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="ACTIVE FAULT">
            <InfoRow label="Active Fault Code" value="0x0003" />

            <InfoRow label="Fault Name" value="Over Voltage" />

            <InfoRow label="Captured Value" value="31.8 V" />

            <InfoRow label="Timestamp" value="12:41:23" />

            <InfoRow label="Status" value="ACTIVE" />
          </Section>
        </Grid>

        {/* LATCHED FAULT */}

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="LATCHED FAULT">
            <InfoRow label="Latched Fault Code" value="0x0002" />

            <InfoRow label="Fault Name" value="Under Voltage" />

            <InfoRow label="Captured Value" value="17.5 V" />

            <InfoRow label="Timestamp" value="09:12:44" />

            <InfoRow label="Status" value="LATCHED" />
          </Section>
        </Grid>
      </Grid>

      {/* FAULT SUMMARY */}

      <Paper
        elevation={1}
        sx={{
          mt: 3,
          borderRadius: 2,
          overflow: "hidden",
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
          <Typography sx={{ fontWeight: 600 }}>FAULT SUMMARY</Typography>
        </Box>

        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Fault Status Word
                </Typography>

                <Typography
  variant="h5"
  sx={{ fontWeight: 700, mt: 1 }}
>
                  0x00000003
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Stored Fault Count
                </Typography>

                <Typography
  variant="h5"
  sx={{ fontWeight: 700, mt: 1 }}
>
                  12
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Last Fault
                </Typography>

                <Typography
  variant="h5"
  sx={{ fontWeight: 700, mt: 1 }}
>
                  Over Voltage
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* STORED FAULT LOG */}

      <Paper
        elevation={1}
        sx={{
          mt: 3,
          borderRadius: 2,
          overflow: "hidden",
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
          <Typography sx={{ fontWeight: 600 }}>STORED FAULT LOG</Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>

              <TableCell>Fault Code</TableCell>

              <TableCell>Fault Name</TableCell>

              <TableCell>Captured Value</TableCell>

              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>12:41:23</TableCell>

              <TableCell>0x0003</TableCell>

              <TableCell>Over Voltage</TableCell>

              <TableCell>31.8 V</TableCell>

              <TableCell>Active</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>09:12:44</TableCell>

              <TableCell>0x0002</TableCell>

              <TableCell>Under Voltage</TableCell>

              <TableCell>17.5 V</TableCell>

              <TableCell>Latched</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>08:01:15</TableCell>

              <TableCell>0x0007</TableCell>

              <TableCell>Over Current</TableCell>

              <TableCell>15.6 A</TableCell>

              <TableCell>Cleared</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

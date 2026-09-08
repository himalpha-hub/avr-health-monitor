import { Box, Typography } from "@mui/material";

type Props = {
  label: string;
  value: string;
  unit?: string;
};

export default function MeasurementRow({
  label,
  value,
  unit,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1.2,
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          color: "#374151",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontWeight: 700,
          color: "#0F4C81",
          fontSize: "1.05rem",
        }}
      >
        {value} {unit}
      </Typography>
    </Box>
  );
}
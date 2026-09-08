import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  title: string;
  value: string;
  unit?: string;
}

export default function MetricCard({
  title,
  value,
  unit,
}: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        borderTop: "4px solid #0F4C81",
      }}
    >
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontSize: 34,
            fontWeight: 700,
            color: "#0F4C81",
          }}
        >
          {value}
        </Typography>

        {unit && (
          <Typography color="text.secondary">
            {unit}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
import {
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  value: string;
  color:
    | "success"
    | "error"
    | "warning"
    | "primary";
}

export default function StatusCard({
  title,
  value,
  color,
}: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        textAlign: "center",
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
            mt: 2,
            mb: 2,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>

        <Chip
          label={value}
          color={color}
        />
      </CardContent>
    </Card>
  );
}
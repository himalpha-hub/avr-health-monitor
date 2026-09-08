import { Box, Paper, Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export default function MeasurementSection({
  title,
  children,
  action,
}: Props) {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        border: "1px solid #E5E7EB",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#0F4C81",
          color: "white",
          px: 2,
          py: 1.25,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            letterSpacing: 0.5,
            fontSize: "0.95rem",
          }}
        >
          {title}
        </Typography>

        {action}
      </Box>

      <Box sx={{ p: 2 }}>{children}</Box>
    </Paper>
  );
}
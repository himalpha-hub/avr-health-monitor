import { useState } from "react";
import type { ReactNode } from "react";
import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({
  children,
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#EEF2F7",
      }}
    >
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <Box
        sx={{
          flexGrow: 1,
          ml: sidebarOpen ? "280px" : "88px",
          transition:
            "margin-left 0.25s ease",
          minHeight: "100vh",
        }}
      >
        <TopBar />

        <Box
          sx={{
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
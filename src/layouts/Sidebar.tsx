import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Divider,
} from "@mui/material";

import {
  Menu,
  Dashboard,
  MonitorHeart,
  WarningAmber,
  SettingsRemote,
  Tune,
  Description,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    label: "Live Monitoring",
    path: "/",
    icon: <Dashboard />,
  },
  {
    label: "Health & Status",
    path: "/health",
    icon: <MonitorHeart />,
  },
  {
    label: "Fault Monitor",
    path: "/faults",
    icon: <WarningAmber />,
  },
  {
    label: "Commands & Control",
    path: "/communication",
    icon: <SettingsRemote />,
  },
  {
    label: "Configuration",
    path: "/config",
    icon: <Tune />,
  },
  {
    label: "Records & Logs",
    path: "/logs",
    icon: <Description />,
  },
];

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: open ? 280 : 88,
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1200,

        transition: "width 0.25s ease",

        background: "linear-gradient(180deg,#001229 0%,#001A3A 100%)",

        borderRight: "1px solid rgba(255,255,255,0.08)",

        display: "flex",
        flexDirection: "column",

        overflow: "hidden",
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          px: 2,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
        }}
      >
        {open && (
          <Box>
            <Typography
              sx={{
                color: "#fff",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              AVR HMI
            </Typography>

            <Typography
              sx={{
                color: "#8FA7C2",
                fontSize: 12,
              }}
            >
              Controller Monitoring
            </Typography>
          </Box>
        )}

        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            color: "#fff",
          }}
        >
          <Menu />
        </IconButton>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.08)",
        }}
      />

      {/* UNIT INFO */}

      {open && (
        <Box
          sx={{
            px: 3,
            py: 2,
          }}
        >
         
        </Box>
      )}

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.08)",
        }}
      />

      {/* MENU */}

      <List
        sx={{
          px: 1.5,
          py: 2,
          flexGrow: 1,
        }}
      >
        {menuItems.map((item) => {
          const selected = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                minHeight: 54,
                borderRadius: 3,

                justifyContent: open ? "initial" : "center",

                bgcolor: selected ? "#1E4F91" : "transparent",

                "&:hover": {
                  bgcolor: selected ? "#1E4F91" : "rgba(255,255,255,0.06)",
                },

                "&.Mui-selected": {
                  bgcolor: "#1E4F91",
                },

                "&.Mui-selected:hover": {
                  bgcolor: "#1E4F91",
                },
              }}
              selected={selected}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: "center",

                  color: selected ? "#56C7FF" : "#A8B6CC",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {open && (
                <Typography
                  sx={{
                    color: "#FFFFFF !important",
                    fontSize: "16px",
                    fontWeight: selected ? 700 : 500,
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </Typography>
              )}
            </ListItemButton>
          );
        })}
      </List>

      {/* FOOTER */}

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.08)",
        }}
      />

      {open && (
        <Box
          sx={{
            p: 3,
          }}
        >
        
        </Box>
      )}
    </Box>
  );
}

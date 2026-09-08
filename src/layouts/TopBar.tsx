import { useEffect, useState } from "react";

import {
  Box,
  Chip,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
} from "@mui/material";

import { useTelemetryStore } from "../store/telemetryStore";

export default function TopBar() {
  const [transport, setTransport] =
    useState("");

  const [connected, setConnected] =
    useState(false);

  const clearTelemetry =
    useTelemetryStore(
      (state) => state.clearTelemetry
    );

  useEffect(() => {
    loadCurrentTransport();
  }, []);

  const loadCurrentTransport =
    async () => {

      try {

        const response =
          await fetch(
            "http://127.0.0.1:8000/transport"
          );

        const result =
          await response.json();

        setTransport(
          result.transport
        );

      } catch (err) {

        console.error(
          "LOAD TRANSPORT ERROR",
          err
        );

      }
    };

  const connectTransport =
    async () => {

      try {

        //
        // SELECTED TRANSPORT APPLY
        //

        const transportResponse =
          await fetch(
            "http://127.0.0.1:8000/transport",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                transport,
              }),
            }
          );

        const transportResult =
          await transportResponse.json();

        if (
          !transportResult.success
        ) {

          console.error(
            "TRANSPORT SWITCH FAILED"
          );

          return;

        }

        //
        // CONNECT
        //

        const response =
          await fetch(
            "http://127.0.0.1:8000/connect",
            {
              method: "POST",
            }
          );

        const result =
          await response.json();

        if (result.success) {

          setConnected(true);

          console.log(
            "CONNECTED:",
            transport
          );

        }

      } catch (err) {

        console.error(
          "CONNECT ERROR",
          err
        );

      }
    };

  const disconnectTransport =
    async () => {

      try {

        await fetch(
          "http://127.0.0.1:8000/disconnect",
          {
            method: "POST",
          }
        );

        clearTelemetry();

        setConnected(false);

        console.log(
          "DISCONNECTED"
        );

      } catch (err) {

        console.error(
          "DISCONNECT ERROR",
          err
        );

      }
    };

  return (
    <Box
      sx={{
        height: 80,
        backgroundColor: "#FFFFFF",
        borderBottom:
          "2px solid #D8DEE9",
        px: 4,

        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h5">
          AVR Controller Health Monitor
        </Typography>

       
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <FormControl size="small">
          <Select
            value={transport}
            onChange={(e) =>
              setTransport(
                e.target.value
              )
            }
            sx={{
              minWidth: 180,
            }}
          >
            <MenuItem value="can">
              CAN
            </MenuItem>

            <MenuItem value="usb_ttl">
              USB TTL
            </MenuItem>

            <MenuItem value="simulator">
              Simulator
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={
            connectTransport
          }
          disabled={
            !transport ||
            connected
          }
        >
          CONNECT
        </Button>

        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={
            disconnectTransport
          }
          disabled={
            !connected
          }
        >
          DISCONNECT
        </Button>

        <Chip
          label={
            connected
              ? "ONLINE"
              : "OFFLINE"
          }
          color={
            connected
              ? "success"
              : "error"
          }
        />

        <Chip
          label={
            transport
              ? transport.toUpperCase()
              : "NO TRANSPORT"
          }
          color="primary"
        />
      </Box>
    </Box>
  );
}
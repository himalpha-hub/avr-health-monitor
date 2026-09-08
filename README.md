# AVR Health Monitor

Professional AVR (Automatic Voltage Regulator) Health Monitoring and Diagnostics Application.

The application provides real-time monitoring, visualization, diagnostics, transport abstraction, telemetry logging, and future-ready support for multiple communication interfaces.

---

# Overview

AVR Health Monitor is designed as a modular industrial monitoring platform capable of receiving telemetry from multiple transport layers such as:

- CAN
- USB TTL
- RS422 (planned)
- Simulator

The system provides a unified dashboard for monitoring:

- Electrical Parameters
- Current Parameters
- Exciter Parameters
- Thermal Parameters
- Protection Status
- Fault Status
- Built-In Test (BIT) Results
- Health Status

---

# Features

## Real-Time Telemetry

- Live parameter monitoring
- WebSocket based updates
- Low latency data refresh

## Trend Analysis

- Historical parameter plotting
- Temperature trends
- Voltage trends
- Current trends

## Transport Abstraction Layer

Runtime switching between transports.

Supported:

- CAN
- USB TTL
- Simulator

Planned:

- RS422
- Ethernet
- UDP
- TCP/IP

## Modular Backend

Driver architecture allows easy addition of new communication interfaces.

---

# High Level Architecture

Frontend
↓
WebSocket / REST API
↓
FastAPI Backend
↓
Transport Manager
↓
Transport Driver
↓
Hardware

Examples:

Frontend
↓
Backend
↓
CAN Driver
↓
AVR Controller

Frontend
↓
Backend
↓
USB TTL Driver
↓
AVR Controller

Frontend
↓
Backend
↓
Simulator Driver
↓
Generated Telemetry

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Material UI
- Zustand
- Recharts

## Backend

- Python
- FastAPI
- WebSocket

---

# Project Structure

```text
backend/

├── api/
├── drivers/
│   ├── can_driver.py
│   ├── usb_ttl_driver.py
│   └── simulator_driver.py
│
├── managers/
│   └── transport_manager.py
│
├── services/
├── models/
└── main.py

src/

├── components/
├── pages/
├── store/
├── services/
└── App.tsx
```

---

# Transport Layer

The application uses a Transport Manager pattern.

Responsibilities:

- Driver creation
- Driver switching
- Connection handling
- Runtime transport selection

Example:

```python
transport_manager.switch_transport(
    "can"
)
```

Supported values:

```text
can
usb_ttl
simulator
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/himalpha-hub/avr-health-monitor.git
```

```bash
cd avr-health-monitor
```

---

# Frontend Setup

```bash
npm install
```

Run:

```bash
npm run dev
```

Default:

```text
http://localhost:5173
```

---

# Backend Setup

Create virtual environment:

```bash
python -m venv .venv
```

Activate:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run:

```bash
uvicorn backend.main:app --reload
```

Default:

```text
http://localhost:8000
```

---

# API Endpoints

## Switch Transport

```http
POST /transport
```

Example:

```json
{
  "transport": "usb_ttl"
}
```

---

# WebSocket

```text
ws://localhost:8000/ws
```

Used for:

- Real-time telemetry streaming
- Dashboard updates
- Trend plotting

---

# Supported Parameters

## Electrical

- Output Voltage
- Output Frequency

## Current

- Output Current

## Thermal

- Temperature
- Ambient Temperature

## Exciter

- Excitation Voltage
- Excitation Current

## Protection

- Over Voltage
- Under Voltage
- Over Temperature

## Health

- System Health
- BIT Status
- Fault Status

---

# Contribution Workflow

See:

CONTRIBUTING.md

Workflow:

Fork
→ Feature Branch
→ Commit
→ Pull Request
→ Review
→ Merge

---

# Roadmap

## Phase 1

- Dashboard
- Simulator
- USB TTL
- CAN

## Phase 2

- RS422
- Data Logging
- CSV Export

## Phase 3

- Ethernet
- Remote Monitoring
- User Authentication

## Phase 4

- Multi-Device Monitoring
- Alarm Management
- Advanced Diagnostics

---

# License

Copyright © HimAlpha

All Rights Reserved.
# AVR Health Monitor - Contribution Guide

## Development Workflow

This repository follows a Fork → Feature Branch → Pull Request workflow.

Direct commits to the main branch are not allowed.

---

## Step 1: Fork Repository

Create your own fork of the repository.

Example:

https://github.com/<your-username>/avr-health-monitor

---

## Step 2: Clone Your Fork

```bash
git clone https://github.com/<your-username>/avr-health-monitor.git
cd avr-health-monitor
```

---

## Step 3: Add Upstream Remote

```bash
git remote add upstream https://github.com/himalpha-hub/avr-health-monitor.git
```

Verify:

```bash
git remote -v
```

Expected:

```bash
origin    https://github.com/<your-username>/avr-health-monitor.git
upstream  https://github.com/himalpha-hub/avr-health-monitor.git
```

---

## Step 4: Sync With Main Repository

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

---

## Step 5: Create Feature Branch

Never work directly on main.

```bash
git checkout -b feature/transport-manager
```

Examples:

```bash
feature/can-driver
feature/dashboard-ui
feature/trend-plot
bugfix/socket-reconnect
refactor/backend-api
```

---

## Step 6: Commit Format

Use conventional commit messages.

### Feature

```bash
git commit -m "feat: add transport switching support"
```

### Bug Fix

```bash
git commit -m "fix: resolve websocket reconnect issue"
```

### Refactor

```bash
git commit -m "refactor: simplify telemetry parser"
```

### Documentation

```bash
git commit -m "docs: update contribution workflow"
```

### Chore

```bash
git commit -m "chore: update dependencies"
```

---

## Step 7: Push Feature Branch

```bash
git push origin feature/transport-manager
```

---

## Step 8: Create Pull Request

Open a Pull Request from:

```text
your-feature-branch
        ↓
main
```

Provide:

- Summary
- Screenshots (if UI changes)
- Test results
- Related issue number

---

## Pull Request Rules

Every PR should:

- Build successfully
- Not break existing functionality
- Follow project structure
- Include meaningful commit messages
- Be reviewed before merge

---

## Coding Guidelines

### Frontend

- React
- TypeScript
- MUI
- Zustand

### Backend

- Python
- FastAPI

### General

- Avoid hardcoded values
- Use clear naming
- Keep functions focused
- Prefer reusable components

---

## Branch Naming

```text
feature/<feature-name>
bugfix/<bug-name>
refactor/<module-name>
docs/<topic>
chore/<task>
```

Examples:

feature/dashboard-layout
feature/can-transport
bugfix/socket-timeout
refactor/data-parser

---

## Merge Policy

Only repository maintainers can merge Pull Requests into main.

Contributors must work through Pull Requests.

Direct pushes to main are discouraged.

---

Happy Coding 🚀
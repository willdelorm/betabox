# BetaBox

A bouldering progress tracker — log sessions, record climbs, and visualize your improvement over time.

## Live Demo

[betabox-e008c.web.app](https://betabox-e008c.web.app/)

## What It Does

- **Session logging** — start a timed session, quick-log climbs by V-grade (V0–V11), and end with a title, location, and notes
- **Climb details** — record name, effort (RPE), style (flash, send, etc.), and number of attempts per climb
- **Dashboard** — recent sessions at a glance with a bar chart of climbs per session
- **History & stats** — view all past sessions with aggregate stats: max send grade, total climbs, average RPE, average V-grade
- **Per-user accounts** — email/password auth keeps your data private

## Why I Built It

I was frustrated tracking my climbing on paper and generic spreadsheets. I wanted something purpose-built for bouldering that could show me trends over time — so I built it.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, React Router 7 |
| UI | React Bootstrap 5 |
| Charts | Recharts |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| Build | Vite |
| Hosting | Firebase Hosting |

## Architecture

Four pages connected by client-side routing (HashRouter):

- **Splash** — landing page with sign-in and registration modals
- **Home** — dashboard with recent sessions and a climbs-per-session chart
- **New** — active session view with timer, grade buttons, and climb list
- **History** — all past sessions with aggregate statistics and a session detail modal

Key patterns:

- `useReducer` manages climb state (add / edit / delete / undo) during an active session
- Firebase interactions are centralized in `src/utils/firebase.utils.js`
- Firestore data model: `users/{uid}/sessions/{sessionId}` where each session embeds its climb array
- SPA with a catch-all rewrite rule so Firebase Hosting serves `index.html` for all routes

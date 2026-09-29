# Haven web app

React + TypeScript + Vite frontend for the Myanmar property portal.

## Run locally

1. Install Node.js 20+ and pnpm (or npm).
2. Copy `.env.example` to `.env.local` and set `VITE_API_URL` if the API is not on `http://localhost:4000/api/v1`.
3. Run `pnpm install`, then `pnpm dev`.

The UI falls back to clearly illustrative demo listings when the API is unavailable. Authentication and publishing require the API to be running. The requested shadcn/ui preset is `b7BFbwykC`; apply it with `pnpm dlx shadcn@latest init --template vite --preset b7BFbwykC` once registry access is available. Tailwind is configured as the app's styling base.

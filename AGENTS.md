# AGENTS.md

## Cursor Cloud specific instructions

This is a **single Next.js 16 app** (3D art gallery portfolio) — no monorepo, no backend, no database, no Docker.

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000) |
| Lint | `npm run lint` |
| Build | `npm run build` |

### Notes

- The 3D gallery (`/gallery`) uses `@react-three/fiber`, `@react-three/rapier` (physics), and `ecctrl` (character controller). These are heavy client-side bundles; the gallery page is loaded via `next/dynamic` with `ssr: false`.
- All project data is static TypeScript in `src/data/projects.ts`; there are no environment variables or `.env` files needed.
- The gallery requires pointer lock (browser gesture) to capture mouse input for camera control. Automated browser testing of in-gallery movement is limited by this constraint.
- Hot reload works for all source files under `src/`.

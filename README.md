# Digital Market Place — Backend

> Backend service for the Digital Market Place application (Express + TypeScript + MongoDB).

## Features
- REST API for authentication, products and settings
- File uploads and static media serving
- JWT authentication

## Prerequisites
- Node.js (18+ recommended)
- npm or yarn
- MongoDB instance

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root (see example below)

3. Run in development

```bash
npm run dev
```

4. Build and start (production)

```bash
npm run build
npm run start
```

## API

Base path: `/api`

Main routes:
- `/api/auth` — authentication endpoints
- `/api/product` — product CRUD and events
- `/api/setting` — application settings

See `src/routes` for route implementations.

## Scripts
- `npm run dev` — start dev server with hot reload
- `npm run build` — compile TypeScript
- `npm run start` — run compiled server
- `npm run type-check` — run TypeScript build check

## Notes for Developers
- App entry: `src/index.ts` and `src/app.ts`
- Config schema: `src/config/index.ts` (required env vars are validated on startup)
- Static files served from the folder set in `MEDIA_BUCKET`

## Contributing
Feel free to open issues or pull requests. Keep changes focused and add tests where applicable.

## License
MIT

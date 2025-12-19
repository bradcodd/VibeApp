# Project Tech Stack

This document outlines the technology stack used in the **Vibe App** project.

## Frontend
- **Framework**: [React](https://react.dev/) (v19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS
- **Linting**: ESLint with React-specific plugins

## Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/) (v5)
- **Database Driver**: `mssql` (SQL Server)
- **Environment Management**: `dotenv`
- **CORS**: Enabled via the `cors` middleware

## DevOps & Deployment
- **Web Server**: [IIS (Internet Information Services)](https://www.iis.net/)
- **Process Manager**: [PM2](https://pm2.keymetrics.io/) (with `pm2-windows-service` for persistence on Windows)
- **IIS Modules**: 
    - **URL Rewrite Module**: For handling client-side routing.
    - **Application Request Routing (ARR)**: Used to proxy requests to the Express backend.
- **Package Manager**: npm

## Key Features
- **Database Integration**: Connects to SQL Server for data persistence and queries.
- **Environment Configuration**: Utilizes `.env` for managing environment-specific variables and secrets.
- **IIS Proxying**: Configured to serve the React frontend static files while proxying API requests to the Node.js backend.

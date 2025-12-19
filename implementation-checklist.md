# Implementation Checklist

Follow this checklist to ensure all components of the **Vibe App** are correctly implemented, configured, and deployed.

## 1. Development Environment
- [ ] Install **Node.js** (LTS version recommended).
- [ ] Initialize project with **Vite** and **TypeScript**.
- [ ] Configure **ESLint** and **Prettier** for code quality.
- [ ] Install core dependencies: `react`, `react-dom`, `express`, `mssql`, `cors`, `dotenv`.

## 2. Backend Implementation (Express)
- [ ] Create `server/index.js` as the entry point.
- [ ] Configure **CORS** to allow requests from the frontend development server.
- [ ] Implement **SQL Server (mssql)** connection pool logic.
- [ ] Create API endpoints (e.g., `/api/date`) to verify database connectivity.
- [ ] Setup `dotenv` to load configuration from `.env`.

## 3. Frontend Implementation (React)
- [ ] Set up main application structure in `src/App.tsx`.
- [ ] Implement state management for data fetching.
- [ ] Create components for displaying data (e.g., a footer with server date).
- [ ] Configure **Vite proxy** for local development (optional, if not using full URLs).
- [ ] Ensure responsive design using Vanilla CSS.

## 4. Environment Configuration (`.env`)
- [ ] Define `PORT` for the Express server (default: 3001).
- [ ] Configure `DB_USER`, `DB_PASSWORD`, `DB_SERVER`, and `DB_DATABASE`.
- [ ] Ensure `.env` is added to `.gitignore`.
- [ ] Create a `.env.example` template for other environments.

## 5. Build & Deployment Preparation
- [ ] Run `npm run build` to generate the production `dist` folder.
- [ ] Verify `web.config` is present for IIS URL rewriting.
- [ ] Test the production build locally using `vite preview`.

## 6. IIS Infrastructure Setup
- [ ] Install **IIS (Internet Information Services)** on the target server.
- [ ] Install **URL Rewrite Module**.
- [ ] Install **Application Request Routing (ARR)**.
- [ ] **Enable Proxy** in ARR (IIS Manager -> Server node -> ARR Cache -> Server Proxy Settings).

## 7. Production Deployment (Backend)
- [ ] Create a dedicated directory for the backend (e.g., `C:\domains\...\server`).
- [ ] Copy `package.json`, `package-lock.json`, `server/`, and `.env`.
- [ ] Run `npm install --production`.
- [ ] Install **PM2** globally: `npm install -g pm2`.
- [ ] Start the backend: `pm2 start server/index.js --name "vibeapp-api"`.
- [ ] Configure PM2 as a **Windows Service**:
    - [ ] `npm install -g pm2-windows-service`.
    - [ ] `pm2-service-install -n PM2`.
    - [ ] `pm2 save`.

## 8. Production Deployment (Frontend)
- [ ] Create a dedicated directory for the site files (e.g., `C:\domains\...\client\dist`).
- [ ] Copy contents of the local `dist` folder to the server.
- [ ] Create a new **Site** in IIS pointing to this folder.
- [ ] Configure the host name or IP bindings.

## 9. Final Verification
- [ ] Verify application loads in the browser via the production URL.
- [ ] Confirm API requests are successfully proxied to the backend.
- [ ] Verify database data is correctly displayed in the UI.
- [ ] Test page refreshes (ensure URL Rewrite is working).
- [ ] Verify the backend service persists after server restart or RDP logout.

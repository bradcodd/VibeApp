# Deployment Guide for IIS

This guide explains how to deploy your React frontend and Express backend to a Windows Server running IIS.

## Prerequisites

1.  **Node.js**: Installed on the Windows Server.
2.  **IIS**: Installed with the "Web Server" role.
3.  **IIS Modules**:
    *   **URL Rewrite Module**: [Download here](https://www.iis.net/downloads/microsoft/url-rewrite)
    *   **Application Request Routing (ARR)**: [Download here](https://www.iis.net/downloads/microsoft/application-request-routing)
        *   *After installing ARR, open IIS Manager, click on the Server node, open "Application Request Routing Cache", click "Server Proxy Settings" on the right, and check "Enable proxy".*

## Step 1: Prepare the Build

1.  Run the build command locally (already done):
    ```bash
    npm run build
    ```
    This creates a `dist` folder with your static frontend files and the `web.config`.

## Step 2: Deploy the Backend (Express)

The backend needs to run as a Node.js process. We will use a process manager like **PM2** to keep it running.

1.  **Copy Files**: Create a folder on your server (`C:\domains\codd.com\vibeapp\server`).
    *   Copy the `server` folder.
    *   Copy `package.json` and `package-lock.json`.
    *   Copy `.env`.
2.  **Install Dependencies**:
    Open a terminal (PowerShell/CMD) in that folder and run:
    ```bash
    npm install --production
    ```
3.  **Start the Server**:
    Install PM2 globally if not already installed:
    ```bash
    npm install -g pm2
    ```
    Start your app:
    ```bash
    pm2 start server/index.js --name "vibeapp-api"
    ```
    *Note: Ensure your `.env` file on the server has `PORT=3001`.*
4.  **Persist (TSR) Server (Critical for Windows)**:
    `pm2 save` alone does not persist the process on Windows after you log out. You must run PM2 as a Windows Service.

    *   Install the service handler:
        ```bash
        npm install -g pm2-windows-service
        ```
    *   Install the service (must run PowerShell as **Administrator**):
        ```bash
        pm2-service-install -n PM2
        ```
        *   *When prompted "Perform environment setup?", type `y` and Enter.*
    *   Save your current process list so the service remembers it:
        ```bash
        pm2 save
        ```

## Step 3: Deploy the Frontend (React)

1.  **Copy Files**: Create a folder for the frontend (`C:\domains\codd.com\vibeapp\client\dist`).
    *   Copy the contents of your local `dist` folder into this new folder.
2.  **Configure IIS**:
    *   Open **IIS Manager**.
    *   Right-click **Sites** -> **Add Website**.
    *   **Site name**: VibeApp
    *   **Physical path**: `C:\domains\codd.com\vibeapp\client\dist`
    *   **Port**: 80 (or your desired port).
    *   **Host name**: (Optional, e.g., `vibeapp.local`).

## Step 4: Verify

1.  Open your browser and navigate to your site (e.g., `http://localhost`, your server IP, or `https://vibeapp.codd.com/`.
2.  The frontend should load.
3.  The footer should display the date from the SQL Server (proxied via `/api`).

## Troubleshooting

*   **500 Error on /api**: Ensure ARR is installed and "Enable proxy" is checked in ARR settings.
*   **404 on Refresh**: Ensure the URL Rewrite module is installed. The `web.config` in the `dist` folder handles this.
*   **Database Connection**: Ensure the `DB_SERVER` in your `.env` file is accessible from the Windows Server. If using "localhost" for SQL, ensure SQL Server is on the same machine.

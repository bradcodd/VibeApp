import dotenv from 'dotenv';
import express from 'express';
import sql from 'mssql';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dbConfig = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'your_password',
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || 'master',
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

app.get('/api/system-date', async (req, res) => {
    try {
        // Attempt to connect
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query("SELECT CONVERT(varchar, getdate(), 121) AS [SystemDate]");

        res.json({
            date: result.recordset[0].SystemDate,
            source: 'SQL Server'
        });

    } catch (err) {
        console.error('SQL Error:', err.message);
        // Fallback for demonstration if DB is not available
        res.status(500).json({
            error: 'Could not connect to SQL Server',
            details: err.message,
            fallbackDate: new Date().toISOString(),
            source: 'Fallback (Local)'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

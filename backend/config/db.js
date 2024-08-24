import pg from 'pg';
import 'dotenv/config';

const { Client, Pool } = pg;

// Create a client for single connection use cases
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Create a pool for connection pooling
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Function to connect to the database
export const connectDB = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Database connected successfully');
        await client.connect();
        console.log('Client connected successfully');
    } catch (error) {
        console.error('Database connection error', error.stack);
    }
};

// Export pool as the default export and client as a named export
export default pool;
export { client };

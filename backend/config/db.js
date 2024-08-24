import { Pool } from 'pg';
import 'dotenv/config';

// Create a new pool instance
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
        // Test the connection
        await pool.query('SELECT NOW()');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error', error.stack);
    }
};

// Export the pool for querying the database
export default pool;

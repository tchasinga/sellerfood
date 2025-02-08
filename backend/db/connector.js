import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const { Pool } = pkg;

// Initialize the database connection
const Poolconnector = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'sellerfood',
    password: process.env.DB_PASSWORD || '202050081',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

// Handle connection errors
Poolconnector.on('error', (err) => {
    console.error('Unexpected database connection error:', err);
    process.exit(-1);
});

// Export the connection
export default Poolconnector;

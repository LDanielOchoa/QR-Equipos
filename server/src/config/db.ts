import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + '/.env' });

// Configuración para la conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'employees_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

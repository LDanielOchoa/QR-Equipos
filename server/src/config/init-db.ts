import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: process.cwd() + '/.env' });

// Datos iniciales para la tabla de empleados
const initialEmployees = [
  {
    id: "1007286650",
    name: "SANCHEZ FRANCO NATALIA",
    position: "PROFESIONAL DE MEJORA CONTINUA",
    costCenter: "GERENCIA",
    authorized: true,
    brand: "Lenovo",
    model: "ThinkPad E14 Gen 5",
    serial: "PF4QKZK7",
    assignmentDate: "2024-01-15",
  }
];

async function initDB() {
  // Crear conexión sin especificar la base de datos
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password'
  });

  try {
    // 1. Crear la base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'employees_db'}`);
    console.log(`Base de datos ${process.env.DB_NAME || 'employees_db'} creada o ya existente.`);

    // 2. Seleccionar la base de datos
    await connection.query(`USE ${process.env.DB_NAME || 'employees_db'}`);

    // 3. Crear la tabla de empleados
    await connection.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        costCenter VARCHAR(100) NOT NULL,
        authorized BOOLEAN DEFAULT TRUE,
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        serial VARCHAR(100) NOT NULL,
        assignmentDate DATE NOT NULL
      );
    `);
    console.log('Tabla de empleados creada o ya existente.');

    // 4. Verificar si ya existen datos
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM employees');
    // @ts-ignore
    if (rows[0].count === 0) {
      // 5. Insertar datos iniciales
      console.log('Insertando datos iniciales...');
      
      for (const employee of initialEmployees) {
        await connection.query(
          'INSERT INTO employees (id, name, position, costCenter, authorized, brand, model, serial, assignmentDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            employee.id,
            employee.name,
            employee.position,
            employee.costCenter,
            employee.authorized,
            employee.brand,
            employee.model,
            employee.serial,
            employee.assignmentDate
          ]
        );
      }
      
      console.log('Datos iniciales insertados correctamente.');
    } else {
      console.log('La tabla ya contiene datos, no se insertaron datos iniciales.');
    }

    console.log('Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    await connection.end();
  }
}

// Ejecutar inicialización
initDB();

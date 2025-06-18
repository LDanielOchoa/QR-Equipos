import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employee.routes';

// Cargar variables de entorno
dotenv.config({ path: process.cwd() + '/.env' });

// Inicializar Express
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/employees', employeeRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.json({ message: 'Backend de Gestión de Equipos y Empleados' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

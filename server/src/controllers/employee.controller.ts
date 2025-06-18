import { Request, Response } from 'express';
import db from '../config/db';
import { Employee, EmployeeInput } from '../models/employee.model';

export class EmployeeController {
  // Obtener todos los empleados
  public async getAllEmployees(req: Request, res: Response): Promise<void> {
    try {
      const [employees] = await db.query<Employee[]>('SELECT * FROM employees');
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      res.status(500).json({ message: 'Error al obtener empleados', error });
    }
  }

  // Obtener un empleado por ID
  public async getEmployeeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const [employees] = await db.query<Employee[]>('SELECT * FROM employees WHERE id = ?', [id]);

      if (employees.length === 0) {
        res.status(404).json({ message: 'Empleado no encontrado' });
        return;
      }

      res.status(200).json(employees[0]);
    } catch (error) {
      console.error('Error al obtener el empleado:', error);
      res.status(500).json({ message: 'Error al obtener el empleado', error });
    }
  }

  // Crear un nuevo empleado
  public async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employeeData: EmployeeInput = req.body;
      
      // Generar un ID único (similar a cómo se hacía en el frontend)
      const newId = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
      
      const [result] = await db.query(
        'INSERT INTO employees (id, name, position, costCenter, authorized, brand, model, serial, assignmentDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          newId,
          employeeData.name,
          employeeData.position,
          employeeData.costCenter,
          employeeData.authorized,
          employeeData.brand,
          employeeData.model,
          employeeData.serial,
          employeeData.assignmentDate
        ]
      );

      res.status(201).json({ message: 'Empleado creado con éxito', id: newId });
    } catch (error) {
      console.error('Error al crear el empleado:', error);
      res.status(500).json({ message: 'Error al crear el empleado', error });
    }
  }

  // Actualizar un empleado
  public async updateEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const employeeData: EmployeeInput = req.body;

      const [result] = await db.query(
        'UPDATE employees SET name = ?, position = ?, costCenter = ?, authorized = ?, brand = ?, model = ?, serial = ?, assignmentDate = ? WHERE id = ?',
        [
          employeeData.name,
          employeeData.position,
          employeeData.costCenter,
          employeeData.authorized,
          employeeData.brand,
          employeeData.model,
          employeeData.serial,
          employeeData.assignmentDate,
          id
        ]
      );

      // @ts-ignore
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Empleado no encontrado' });
        return;
      }

      res.status(200).json({ message: 'Empleado actualizado con éxito' });
    } catch (error) {
      console.error('Error al actualizar el empleado:', error);
      res.status(500).json({ message: 'Error al actualizar el empleado', error });
    }
  }

  // Eliminar un empleado
  public async deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const [result] = await db.query('DELETE FROM employees WHERE id = ?', [id]);

      // @ts-ignore
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Empleado no encontrado' });
        return;
      }

      res.status(200).json({ message: 'Empleado eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el empleado:', error);
      res.status(500).json({ message: 'Error al eliminar el empleado', error });
    }
  }
}

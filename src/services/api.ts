import { Employee } from '../../types/employee';

const API_URL = 'http://localhost:3001/api';

// Función para manejar errores de fetch
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ocurrió un error con la solicitud');
  }
  return response.json();
};

// Servicio para empleados
export const employeeService = {
  // Obtener todos los empleados
  async getAll(): Promise<Employee[]> {
    const response = await fetch(`${API_URL}/employees`);
    return handleResponse(response);
  },

  // Obtener un empleado por ID
  async getById(id: string): Promise<Employee> {
    const response = await fetch(`${API_URL}/employees/${id}`);
    return handleResponse(response);
  },

  // Crear un nuevo empleado
  async create(employee: Omit<Employee, 'id'>): Promise<{ id: string }> {
    const response = await fetch(`${API_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    return handleResponse(response);
  },

  // Actualizar un empleado
  async update(id: string, employee: Omit<Employee, 'id'>): Promise<void> {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    return handleResponse(response);
  },

  // Eliminar un empleado
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

"use client"

import { useState, useEffect } from "react"
import type { Employee } from "../types/employee"
import { employeeService } from "../src/services/api"

export const useEmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar empleados desde la API al montar el componente
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        const data = await employeeService.getAll()
        setEmployees(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar empleados:', err)
        setError('Error al cargar los datos. Por favor, intente de nuevo.')
        // Si hay un error de conexión, podríamos usar datos locales como respaldo
        // import { employees as fallbackData } from "../data/employees"
        // setEmployees(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  const addEmployee = async (employeeData: Omit<Employee, "id">) => {
    try {
      setLoading(true)
      const result = await employeeService.create(employeeData)
      
      // Crear un objeto empleado completo con el ID devuelto
      const newEmployee: Employee = {
        ...employeeData,
        id: result.id,
      }
      
      // Actualizar el estado local
      setEmployees(prev => [...prev, newEmployee])
      setError(null)
      
      return newEmployee
    } catch (err) {
      console.error('Error al crear empleado:', err)
      setError('Error al crear el empleado. Por favor, intente de nuevo.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateEmployee = async (id: string, employeeData: Partial<Employee>) => {
    try {
      setLoading(true)
      
      // Obtener el empleado actual para combinar con los nuevos datos
      const currentEmployee = employees.find(emp => emp.id === id)
      
      if (!currentEmployee) {
        throw new Error('Empleado no encontrado')
      }
      
      // Combinar datos actuales con actualizaciones
      const updatedEmployee = { ...currentEmployee, ...employeeData }
      
      // Llamar a la API
      await employeeService.update(id, updatedEmployee)
      
      // Actualizar el estado local
      setEmployees(prev => 
        prev.map(emp => emp.id === id ? { ...emp, ...employeeData } : emp)
      )
      
      setError(null)
    } catch (err) {
      console.error('Error al actualizar empleado:', err)
      setError('Error al actualizar el empleado. Por favor, intente de nuevo.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteEmployee = async (id: string) => {
    try {
      setLoading(true)
      
      // Llamar a la API
      await employeeService.delete(id)
      
      // Actualizar el estado local
      setEmployees(prev => prev.filter(emp => emp.id !== id))
      
      setError(null)
    } catch (err) {
      console.error('Error al eliminar empleado:', err)
      setError('Error al eliminar el empleado. Por favor, intente de nuevo.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getEmployeeById = async (id: string) => {
    try {
      // Primero intentamos encontrar en el estado local
      const localEmployee = employees.find(emp => emp.id === id)
      
      if (localEmployee) {
        return localEmployee
      }
      
      // Si no está en el estado local, consultamos la API
      const employee = await employeeService.getById(id)
      return employee
    } catch (err) {
      console.error('Error al obtener empleado:', err)
      throw err
    }
  }

  return {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
  }
}

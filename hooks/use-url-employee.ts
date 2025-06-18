"use client"

import { useState, useEffect } from "react"
import type { Employee } from "../types/employee"

export const useUrlEmployee = (employees: Employee[]) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [accessedByQR, setAccessedByQR] = useState<boolean>(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const employeeId = urlParams.get("employee")

    if (employeeId) {
      const employee = employees.find((emp) => emp.id === employeeId)
      if (employee) {
        setSelectedEmployee(employee)
        // Si hay un ID de empleado en la URL en la carga inicial, consideramos que se accedió por QR/URL directa
        setAccessedByQR(true)
      }
    }
  }, [employees])

  const updateUrlForEmployee = (employee: Employee) => {
    const newURL = `${window.location.origin}${window.location.pathname}?employee=${employee.id}`
    window.history.pushState({ employee: employee.id }, "", newURL)
  }

  const clearUrl = () => {
    window.history.pushState({}, "", window.location.pathname)
  }

  return {
    selectedEmployee,
    setSelectedEmployee,
    accessedByQR,
    updateUrlForEmployee,
    clearUrl,
  }
}

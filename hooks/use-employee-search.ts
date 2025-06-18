"use client"

import { useState, useMemo } from "react"
import type { Employee } from "../types/employee"

export const useEmployeeSearch = (employees: Employee[]) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees

    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id.includes(searchTerm) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.costCenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.serial.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [employees, searchTerm])

  return {
    searchTerm,
    setSearchTerm,
    filteredEmployees,
  }
}

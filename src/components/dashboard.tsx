"use client"

import type React from "react"
import { Database, Plus } from "lucide-react"
import type { Employee } from "../../types/employee"
import { StatsCards } from "./stats-cards"
import { SearchBar } from "./search-bar"
import { EmployeeTable } from "./employee-table"

interface DashboardProps {
  employees: Employee[]
  filteredEmployees: Employee[]
  searchTerm: string
  onSearchChange: (value: string) => void
  onViewEmployee: (employee: Employee) => void
  onEditEmployee: (employee: Employee) => void
  onCreateEmployee: () => void
  onShowQR: (employee: Employee) => void
  onCopyURL: (employee: Employee) => void
  isVisible: boolean
  loading?: boolean
}

export const Dashboard: React.FC<DashboardProps> = ({
  employees,
  filteredEmployees,
  searchTerm,
  onSearchChange,
  onViewEmployee,
  onEditEmployee,
  onCreateEmployee,
  onShowQR,
  onCopyURL,
  isVisible,
  loading,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-green-100 p-4 sm:p-6">
      <div
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent">
                  Dashboard de Empleados
                </h1>
                <p className="text-gray-600 mt-1">Sistema de gestión de equipos asignados</p>
              </div>
            </div>

            <button
              onClick={onCreateEmployee}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Empleado</span>
            </button>
          </div>

          <StatsCards employees={employees} />
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>

        <EmployeeTable
          employees={filteredEmployees}
          onViewEmployee={onViewEmployee}
          onEditEmployee={onEditEmployee}
          onShowQR={onShowQR}
          onCopyURL={onCopyURL}
          loading={loading}
        />

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Total de registros: <span className="font-semibold">{filteredEmployees.length}</span> de{" "}
            <span className="font-semibold">{employees.length}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { Eye, Share2, QrCode, Hash, Edit, Database } from "lucide-react"
import type { Employee } from "../../types/employee"
import { formatName, formatPosition, generateEmployeeURL } from "../../utils/formatters"
import QRCodeGenerator from "./QRCodeGenerator"

interface EmployeeTableProps {
  employees: Employee[]
  onViewEmployee: (employee: Employee) => void
  onEditEmployee: (employee: Employee) => void
  onShowQR: (employee: Employee) => void
  onCopyURL: (employee: Employee) => void
  loading?: boolean
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onViewEmployee,
  onEditEmployee,
  onShowQR,
  onCopyURL,
  loading,
}) => {
  // Mostrar indicador de carga
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-green-100/50 overflow-hidden">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Database className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Actualizando datos...</h3>
          <p className="text-gray-500">Estamos procesando tu solicitud</p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2 animate-pulse">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-green-100/50 overflow-hidden">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No se encontraron empleados</p>
          <p className="text-gray-400 text-sm mt-1">Intenta con otros términos de búsqueda</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-green-100/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-emerald-600 to-green-700">
            <tr>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                QR
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Empleado
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Nombre del Empleado
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Centro de Costo
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Autorizado
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Marca
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Modelo
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Serial
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-green-100">
            {employees.map((employee, index) => (
              <tr
                key={employee.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-green-50/30"} hover:bg-green-50 transition-colors`}
              >
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <QRCodeGenerator
                      value={generateEmployeeURL(employee.id)}
                      size={60}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      employeeName={formatName(employee.name)}
                    />
                    <button
                      onClick={() => onShowQR(employee)}
                      className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Ver QR más grande"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl flex items-center justify-center">
                      <Hash className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-sm font-mono font-bold text-gray-900">{employee.id}</span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900 break-words">{formatName(employee.name)}</div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="text-sm text-gray-900 break-words max-w-xs">{formatPosition(employee.position)}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                    {employee.costCenter}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      employee.authorized ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.authorized ? "SI" : "NO"}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {employee.brand}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="text-sm text-gray-900 break-words max-w-xs">{employee.model}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                    {employee.serial}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewEmployee(employee)}
                      className="inline-flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver</span>
                    </button>
                    <button
                      onClick={() => onEditEmployee(employee)}
                      className="inline-flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => onCopyURL(employee)}
                      className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Copiar enlace"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

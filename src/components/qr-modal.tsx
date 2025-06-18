"use client"

import type React from "react"

import { Share2 } from "lucide-react"
import type { Employee } from "../../types/employee"
import { formatName, generateEmployeeURL } from "../../utils/formatters"
import QRCodeGenerator from "./QRCodeGenerator"

interface QRModalProps {
  employee: Employee
  onClose: () => void
  onCopyURL: (employee: Employee) => void
}

export const QRModal: React.FC<QRModalProps> = ({ employee, onClose, onCopyURL }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Código QR - {formatName(employee.name)}</h3>
          <p className="text-gray-600 mb-6 text-sm">Escanea para acceder directamente a la información del empleado</p>

          <div className="flex justify-center mb-6">
            <QRCodeGenerator 
              value={generateEmployeeURL(employee.id)} 
              size={200} 
              className="shadow-lg" 
              employeeName={formatName(employee.name)}
              equipmentSerial={employee.serial} 
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onCopyURL(employee)}
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>Copiar Enlace</span>
            </button>

            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

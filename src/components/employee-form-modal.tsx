"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Save, User, Building2, Laptop } from "lucide-react"
import type { Employee } from "../../types/employee"

interface EmployeeFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (employeeData: Omit<Employee, "id"> | Employee) => void
  employee?: Employee | null
  mode: "create" | "edit"
}

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ isOpen, onClose, onSave, employee, mode }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    costCenter: "",
    authorized: true,
    brand: "",
    model: "",
    serial: "",
    assignmentDate: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (employee && mode === "edit") {
      setFormData({
        name: employee.name,
        position: employee.position,
        costCenter: employee.costCenter,
        authorized: employee.authorized,
        brand: employee.brand,
        model: employee.model,
        serial: employee.serial,
        assignmentDate: employee.assignmentDate,
      })
    } else {
      // Reset form for create mode
      setFormData({
        name: "",
        position: "",
        costCenter: "",
        authorized: true,
        brand: "",
        model: "",
        serial: "",
        assignmentDate: new Date().toISOString().split("T")[0],
      })
    }
    setErrors({})
  }, [employee, mode, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.position.trim()) newErrors.position = "El cargo es requerido"
    if (!formData.costCenter.trim()) newErrors.costCenter = "El centro de costo es requerido"
    if (!formData.brand.trim()) newErrors.brand = "La marca es requerida"
    if (!formData.model.trim()) newErrors.model = "El modelo es requerido"
    if (!formData.serial.trim()) newErrors.serial = "El número de serie es requerido"
    if (!formData.assignmentDate) newErrors.assignmentDate = "La fecha de asignación es requerida"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    if (mode === "edit" && employee) {
      onSave({ ...employee, ...formData })
    } else {
      onSave(formData)
    }

    onClose()
  }

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-green-700 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {mode === "create" ? "Agregar Nuevo Empleado" : "Editar Empleado"}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Employee Information Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-emerald-700 uppercase tracking-wider">Información del Empleado</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value.toUpperCase())}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="APELLIDO APELLIDO NOMBRE"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cargo *</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value.toUpperCase())}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.position ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="ANALISTA DE SISTEMAS"
                />
                {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Centro de Costo *</label>
                <input
                  type="text"
                  value={formData.costCenter}
                  onChange={(e) => handleInputChange("costCenter", e.target.value.toUpperCase())}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.costCenter ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="TECNOLOGIA"
                />
                {errors.costCenter && <p className="text-red-500 text-sm mt-1">{errors.costCenter}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Asignación *</label>
                <input
                  type="date"
                  value={formData.assignmentDate}
                  onChange={(e) => handleInputChange("assignmentDate", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.assignmentDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.assignmentDate && <p className="text-red-500 text-sm mt-1">{errors.assignmentDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado de Autorización</label>
                <select
                  value={formData.authorized.toString()}
                  onChange={(e) => handleInputChange("authorized", e.target.value === "true")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="true">Autorizado</option>
                  <option value="false">No Autorizado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Equipment Information Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-700 uppercase tracking-wider">Equipo Asignado</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marca *</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Lenovo"
                />
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Modelo *</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.model ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="ThinkPad E14 Gen 5"
                />
                {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de Serie *</label>
                <input
                  type="text"
                  value={formData.serial}
                  onChange={(e) => handleInputChange("serial", e.target.value.toUpperCase())}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.serial ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="PF4QKZK7"
                />
                {errors.serial && <p className="text-red-500 text-sm mt-1">{errors.serial}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{mode === "create" ? "Crear Empleado" : "Guardar Cambios"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

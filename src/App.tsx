"use client"

import { useState, useEffect } from "react"
import type { ViewType, Employee } from "../types/employee"
// import { employees } from "@/data/employees"
import { useEmployeeSearch } from "../hooks/use-employee-search"
import { useUrlEmployee } from "../hooks/use-url-employee"
import { Dashboard } from "./components/dashboard"
import { EmployeeDetail } from "./components/employee-detail"
import { QRModal } from "./components/qr-modal"
import { useEmployeeManagement } from "../hooks/use-employee-management"
import { EmployeeFormModal } from "./components/employee-form-modal"

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const [isVisible, setIsVisible] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [qrEmployee, setQrEmployee] = useState(null)
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")

  const { employees, loading, error, addEmployee, updateEmployee, deleteEmployee } = useEmployeeManagement()
  const { searchTerm, setSearchTerm, filteredEmployees } = useEmployeeSearch(employees)
  const { selectedEmployee, setSelectedEmployee, accessedByQR, updateUrlForEmployee, clearUrl } = useUrlEmployee(employees)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300)
  }, [])

  useEffect(() => {
    if (selectedEmployee) {
      setCurrentView("detail")
    }
  }, [selectedEmployee])

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee)
    setCurrentView("detail")
    updateUrlForEmployee(employee)
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedEmployee(null)
    clearUrl()
  }

  const handleShowQR = (employee) => {
    setQrEmployee(employee)
    setShowQRModal(true)
  }

  const handleCloseQRModal = () => {
    setShowQRModal(false)
    setQrEmployee(null)
  }

  const handleCopyURL = (employee) => {
    const url = `${window.location.origin}${window.location.pathname}?employee=${employee.id}`
    navigator.clipboard.writeText(url).then(() => {
      console.log("URL copied to clipboard")
    })
  }

  const handleCreateEmployee = () => {
    setEditingEmployee(null)
    setModalMode("create")
    setShowEmployeeModal(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setModalMode("edit")
    setShowEmployeeModal(true)
  }

  const handleSaveEmployee = async (employeeData: Omit<Employee, "id"> | Employee) => {
    try {
      if (modalMode === "create") {
        const newEmployee = await addEmployee(employeeData as Omit<Employee, "id">)
        console.log("Nuevo empleado creado:", newEmployee)
      } else if (modalMode === "edit" && editingEmployee) {
        await updateEmployee(editingEmployee.id, employeeData)
        console.log("Empleado actualizado:", employeeData)
      }
      setShowEmployeeModal(false)
      setEditingEmployee(null)
    } catch (error) {
      console.error("Error al guardar el empleado:", error)
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  const handleCloseEmployeeModal = () => {
    setShowEmployeeModal(false)
    setEditingEmployee(null)
  }

  // Mostrar mensaje de carga mientras se obtienen los datos
  if (loading && employees.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white shadow-lg rounded-lg text-center">
          <div className="animate-pulse flex space-x-4 mb-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-700 font-medium">Cargando datos de empleados...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje de error si ocurrió algún problema
  if (error && employees.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white shadow-lg rounded-lg text-center max-w-md">
          <div className="text-red-500 mb-4 text-5xl">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error de conexión</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (currentView === "detail" && selectedEmployee) {
    return <EmployeeDetail employee={selectedEmployee} onBack={handleBackToDashboard} isVisible={isVisible} hideBackButton={accessedByQR} />
  }

  return (
    <>
      <Dashboard
        employees={employees}
        filteredEmployees={filteredEmployees}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onViewEmployee={handleViewEmployee}
        onEditEmployee={handleEditEmployee}
        onCreateEmployee={handleCreateEmployee}
        onShowQR={handleShowQR}
        onCopyURL={handleCopyURL}
        isVisible={isVisible}
        loading={loading}
      />

      {showQRModal && qrEmployee && (
        <QRModal employee={qrEmployee} onClose={handleCloseQRModal} onCopyURL={handleCopyURL} />
      )}
      {showEmployeeModal && (
        <EmployeeFormModal
          isOpen={showEmployeeModal}
          onClose={handleCloseEmployeeModal}
          onSave={handleSaveEmployee}
          employee={editingEmployee}
          mode={modalMode}
        />
      )}
    </>
  )
}

export default App

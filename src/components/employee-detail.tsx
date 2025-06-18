"use client"

import type React from "react"

import {
  ArrowLeft,
  Building2,
  Laptop,
  Sparkles,
  Hash,
  Award,
  Calendar,
  MapPin,
  HardDrive,
  Monitor,
  Shield,
  Clock,
  Check,
} from "lucide-react"
import type { Employee } from "../../types/employee"
import { formatName, formatPosition, formatDate } from "../../utils/formatters"

interface EmployeeDetailProps {
  employee: Employee
  onBack: () => void
  isVisible: boolean
  hideBackButton?: boolean
}

export const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onBack, isVisible, hideBackButton = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-green-100 p-3 sm:p-4 md:p-6">
      {/* Back Button - Solo se muestra cuando no se accedió por QR */}
      {!hideBackButton && (
        <div className="max-w-7xl mx-auto mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md border border-green-200 text-green-700 font-semibold hover:bg-green-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Dashboard</span>
          </button>
        </div>
      )}

      {/* Employee Detail Card */}
      <div className="flex items-center justify-center">
        <div
          className={`relative transition-all duration-1000 transform w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl ${
            isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
          }`}
        >
          {/* Main Card */}
          <div className="relative w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-green-100/50">
            {/* Header */}
            <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 overflow-hidden">
              {/* Geometric background pattern */}
              <div className="absolute inset-0 opacity-15">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-4 sm:top-8 right-8 sm:right-12 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border border-white/30 rounded-2xl sm:rounded-3xl rotate-12"></div>
                  <div className="absolute top-3 sm:top-6 right-6 sm:right-10 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 border-2 border-white/40 rounded-xl sm:rounded-2xl rotate-45"></div>
                  <div className="absolute bottom-3 sm:bottom-6 left-8 sm:left-12 w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 border border-white/20 rounded-full"></div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute inset-0">
                <Sparkles className="absolute top-3 sm:top-6 left-4 sm:left-8 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white/80" />
                <Sparkles className="absolute top-6 sm:top-10 right-10 sm:right-16 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-white/60" />
                <Sparkles className="absolute bottom-4 sm:bottom-8 left-10 sm:left-16 w-3 sm:w-4 h-3 sm:h-4 text-white/70" />
              </div>

              {/* SAO6 Logo Profile Avatar */}
              <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 left-4 sm:left-6 md:left-8 z-50">
                <div className="relative w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 bg-gradient-to-br from-white to-green-50 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center border-2 sm:border-3 md:border-4 border-white overflow-hidden z-50">
                  <img
                    src="/SAO6.webp"
                    alt="SAO6 Logo"
                    className="w-10 sm:w-12 md:w-16 lg:w-20 h-10 sm:h-12 md:h-16 lg:h-20 object-contain"
                  />

                  {/* Status badge */}
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-6 sm:w-7 md:w-8 lg:w-9 h-6 sm:h-7 md:h-8 lg:h-9 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border-2 sm:border-3 border-white z-50">
                    <Check className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Employee ID Badge */}
              <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 left-4 sm:left-6 md:left-8">
                <div className="flex items-center space-x-2 sm:space-x-3 bg-white/25 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-2 sm:py-3 border border-white/40">
                  <Hash className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-white" />
                  <span className="text-xs sm:text-sm font-mono text-white font-bold tracking-wider">
                    {employee.id}
                  </span>
                </div>
              </div>

              {/* Professional badge */}
              <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 right-4 sm:right-6 md:right-8">
                <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-white/25 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/40">
                  <Award className="w-4 sm:w-5 md:w-6 h-4 sm:w-5 md:h-6 text-white" />
                </div>
              </div>

              {/* Department badge */}
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8">
                <div className="flex items-center space-x-1 sm:space-x-2 bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl px-2 sm:px-3 md:px-4 py-1 sm:py-2 border border-white/30">
                  <Building2 className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wide">
                    {employee.department}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-12 sm:pt-14 md:pt-16 lg:pt-18 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-8 lg:px-10 bg-gradient-to-b from-white to-green-50/30">
              {/* Name */}
              <div className="mb-6 sm:mb-8 md:mb-10">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
                  {formatName(employee.name)}
                </h2>
                <div className="h-1 sm:h-1.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full w-16 sm:w-20"></div>
              </div>

              {/* Information Grid */}
              <div className="space-y-6 sm:space-y-8 md:space-y-10">
                {/* Employee Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 md:mb-8">
                    <div className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                      <Building2 className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-emerald-700 uppercase tracking-wider">
                      Información del Empleado
                    </h3>
                  </div>

                  {/* Position */}
                  <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-green-50/80 border border-green-100/60">
                    <div className="flex-shrink-0 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <Building2 className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-emerald-600 font-bold mb-2 sm:mb-3 uppercase tracking-wide">
                        Cargo
                      </p>
                      <p className="text-gray-800 leading-relaxed font-semibold text-sm sm:text-base md:text-lg break-words">
                        {formatPosition(employee.position)}
                      </p>
                    </div>
                  </div>

                  {/* Cost Center and Assignment Date Grid */}
                  <div className="grid grid-cols-1  gap-4 sm:gap-6">
                    <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-green-50/80 border border-green-100/60">
                      <div className="flex-shrink-0 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-teal-100 to-emerald-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
                        <MapPin className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-teal-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-teal-600 font-bold mb-2 sm:mb-3 uppercase tracking-wide">
                          Centro de Costo
                        </p>
                        <span className="text-gray-800 font-bold text-sm sm:text-base md:text-lg bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                          {employee.costCenter}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equipment Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 md:mb-8">
                    <div className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                      <Laptop className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-700 uppercase tracking-wider">
                      Equipo Asignado
                    </h3>
                  </div>

                  {/* Equipment Brand & Model */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-emerald-50/80 border border-emerald-100/60">
                      <div className="flex-shrink-0 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
                        <Monitor className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-emerald-600 font-bold mb-2 sm:mb-3 uppercase tracking-wide">
                          Marca
                        </p>
                        <p className="text-gray-800 font-bold text-sm sm:text-base md:text-lg">{employee.brand}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-emerald-50/80 border border-emerald-100/60">
                      <div className="flex-shrink-0 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
                        <Laptop className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-green-600 font-bold mb-2 sm:mb-3 uppercase tracking-wide">
                          Modelo
                        </p>
                        <span className="text-gray-800 font-bold text-sm sm:text-base md:text-lg break-words">
                          {employee.model}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Serial Number */}
                  <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-teal-50/80 border border-teal-100/60">
                    <div className="flex-shrink-0 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-teal-100 to-green-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <HardDrive className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-teal-600 font-bold mb-3 sm:mb-4 uppercase tracking-wide">
                        Número de Serie
                      </p>
                      <div className="inline-block bg-gradient-to-r from-gray-50 to-green-50 border-2 border-green-200 rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                        <span className="text-gray-800 font-mono font-bold text-sm sm:text-base md:text-lg tracking-wider break-all">
                          {employee.serial}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 pt-4 sm:pt-6 md:pt-8">
                  <div
                    className={`inline-flex items-center space-x-2 sm:space-x-3 md:space-x-4 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl ${
                      employee.authorized
                        ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-2 border-emerald-200"
                        : "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-2 border-red-200"
                    }`}
                  >
                    <Shield className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                    <span className="font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">
                      {employee.authorized ? "Empleado Autorizado" : "No Autorizado"}
                    </span>
                  </div>

                  <div className="inline-flex items-center space-x-2 sm:space-x-3 md:space-x-4 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-green-100 to-teal-100 text-green-700 rounded-xl sm:rounded-2xl border-2 border-green-200">
                    <Laptop className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                    <span className="font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">
                      Equipo Asignado
                    </span>
                  </div>

                  <div className="inline-flex items-center space-x-2 sm:space-x-3 md:space-x-4 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-xl sm:rounded-2xl border-2 border-blue-200">
                    <Clock className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                    <span className="font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">Activo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="h-2 sm:h-3 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

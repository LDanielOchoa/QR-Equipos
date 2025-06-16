import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Shield, 
  Laptop,
  Check,
  Hash,
  Sparkles,
  Monitor,
  HardDrive,
  MapPin,
  Award,
  Calendar,
  Clock,
  Users,
  Search,
  Filter,
  Eye,
  ArrowLeft,
  Database
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  costCenter: string;
  authorized: boolean;
  brand: string;
  model: string;
  serial: string;
  assignmentDate: string;
  department: string;
}

// Sample data with multiple employees
const employees: Employee[] = [
  {
    id: "1007286650",
    name: "SANCHEZ FRANCO NATALIA",
    position: "PROFESIONAL DE MEJORA CONTINUA",
    costCenter: "GERENCIA",
    authorized: true,
    brand: "Lenovo",
    model: "ThinkPad E14 Gen 5",
    serial: "PF4QKZK7",
    assignmentDate: "2024-01-15",
    department: "Operaciones"
  },
  {
    id: "1007286651",
    name: "RODRIGUEZ MARTINEZ CARLOS",
    position: "ANALISTA DE SISTEMAS",
    costCenter: "TECNOLOGIA",
    authorized: true,
    brand: "Dell",
    model: "Latitude 5520",
    serial: "DL5520X1",
    assignmentDate: "2024-02-10",
    department: "IT"
  },
  {
    id: "1007286652",
    name: "GONZALEZ LOPEZ MARIA",
    position: "COORDINADORA DE RECURSOS HUMANOS",
    costCenter: "RECURSOS HUMANOS",
    authorized: true,
    brand: "HP",
    model: "EliteBook 840",
    serial: "HP840G8",
    assignmentDate: "2024-01-20",
    department: "RRHH"
  },
  {
    id: "1007286653",
    name: "PEREZ SILVA JUAN",
    position: "ESPECIALISTA EN FINANZAS",
    costCenter: "FINANZAS",
    authorized: true,
    brand: "Lenovo",
    model: "ThinkPad T14",
    serial: "LT14FIN",
    assignmentDate: "2024-03-05",
    department: "Finanzas"
  },
  {
    id: "1007286654",
    name: "TORRES RAMIREZ ANA",
    position: "JEFE DE VENTAS",
    costCenter: "COMERCIAL",
    authorized: true,
    brand: "MacBook",
    model: "MacBook Pro 14",
    serial: "MBP14VT",
    assignmentDate: "2024-02-28",
    department: "Ventas"
  }
];

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'detail'>('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  const formatName = (name: string) => {
    return name.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const formatPosition = (position: string) => {
    return position.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.includes(searchTerm) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.costCenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.serial.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setCurrentView('detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedEmployee(null);
  };

  if (currentView === 'detail' && selectedEmployee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-green-100 p-3 sm:p-4 md:p-6">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto mb-6">
          <button
            onClick={handleBackToDashboard}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md border border-green-200 text-green-700 font-semibold hover:bg-green-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Dashboard</span>
          </button>
        </div>

        {/* Employee Detail Card */}
        <div className="flex items-center justify-center">
          <div 
            className={`relative transition-all duration-1000 transform w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
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
                <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 left-4 sm:left-6 md:left-8">
                  <div className="relative w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 bg-gradient-to-br from-white to-green-50 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center border-2 sm:border-3 md:border-4 border-white overflow-hidden">
                    <img 
                      src="/cropped-logosimb-sao-300x300-picaai-removebg-preview.webp" 
                      alt="SAO6 Logo" 
                      className="w-10 sm:w-12 md:w-16 lg:w-20 h-10 sm:h-12 md:h-16 lg:h-20 object-contain"
                    />
                    
                    {/* Status badge */}
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-6 sm:w-7 md:w-8 lg:w-9 h-6 sm:h-7 md:h-8 lg:h-9 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border-2 sm:border-3 border-white">
                      <Check className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Employee ID Badge */}
                <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 left-4 sm:left-6 md:left-8">
                  <div className="flex items-center space-x-2 sm:space-x-3 bg-white/25 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-2 sm:py-3 border border-white/40">
                    <Hash className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 text-white" />
                    <span className="text-xs sm:text-sm font-mono text-white font-bold tracking-wider">
                      {selectedEmployee.id}
                    </span>
                  </div>
                </div>

                {/* Professional badge */}
                <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 right-4 sm:right-6 md:right-8">
                  <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-white/25 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/40">
                    <Award className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white" />
                  </div>
                </div>

                {/* Department badge */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8">
                  <div className="flex items-center space-x-1 sm:space-x-2 bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl px-2 sm:px-3 md:px-4 py-1 sm:py-2 border border-white/30">
                    <Building2 className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wide">
                      {selectedEmployee.department}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-12 sm:pt-14 md:pt-16 lg:pt-18 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-8 lg:px-10 bg-gradient-to-b from-white to-green-50/30">
                {/* Name */}
                <div className="mb-6 sm:mb-8 md:mb-10">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
                    {formatName(selectedEmployee.name)}
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
                        <p className="text-xs sm:text-sm text-emerald-600 font-bold mb-2 sm:mb-3 uppercase tracking-wide">Cargo</p>
                        <p className="text-gray-800 leading-relaxed font-semibold text-sm sm:text-base md:text-lg break-words">
                          {formatPosition(selectedEmployee.position)}
                        </p>
                      </div>
                    </div>

                    {/* Cost Center and Assignment Date Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-green-50/80 border border-green-100/60">
                        <div className="flex-shrink-0 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-teal-100 to-emerald-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
                          <MapPin className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-teal-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-teal-600 font-bold mb-2 sm:mb-3 uppercase tracking-wide">Centro de Costo</p>
                          <span className="text-gray-800 font-bold text-sm sm:text-base md:text-lg bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                            {selectedEmployee.costCenter}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-emerald-50/80 border border-emerald-100/60">
                        <div className="flex-shrink-0 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
                          <Calendar className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-emerald-600 font-bold mb-2 sm:mb-3 uppercase tracking-wide">Fecha de Asignación</p>
                          <span className="text-gray-800 font-bold text-sm sm:text-base md:text-lg">
                            {formatDate(selectedEmployee.assignmentDate)}
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
                          <p className="text-xs sm:text-sm text-emerald-600 font-bold mb-2 sm:mb-3 uppercase tracking-wide">Marca</p>
                          <p className="text-gray-800 font-bold text-sm sm:text-base md:text-lg">
                            {selectedEmployee.brand}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-emerald-50/80 border border-emerald-100/60">
                        <div className="flex-shrink-0 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
                          <Laptop className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-green-600 font-bold mb-2 sm:mb-3 uppercase tracking-wide">Modelo</p>
                          <span className="text-gray-800 font-bold text-sm sm:text-base md:text-lg break-words">
                            {selectedEmployee.model}
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
                        <p className="text-xs sm:text-sm text-teal-600 font-bold mb-3 sm:mb-4 uppercase tracking-wide">Número de Serie</p>
                        <div className="inline-block bg-gradient-to-r from-gray-50 to-green-50 border-2 border-green-200 rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                          <span className="text-gray-800 font-mono font-bold text-sm sm:text-base md:text-lg tracking-wider break-all">
                            {selectedEmployee.serial}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 pt-4 sm:pt-6 md:pt-8">
                    <div className={`inline-flex items-center space-x-2 sm:space-x-3 md:space-x-4 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl ${
                      selectedEmployee.authorized 
                        ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-2 border-emerald-200' 
                        : 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-2 border-red-200'
                    }`}>
                      <Shield className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                      <span className="font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">
                        {selectedEmployee.authorized ? 'Empleado Autorizado' : 'No Autorizado'}
                      </span>
                    </div>

                    <div className="inline-flex items-center space-x-2 sm:space-x-3 md:space-x-4 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-green-100 to-teal-100 text-green-700 rounded-xl sm:rounded-2xl border-2 border-green-200">
                      <Laptop className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                      <span className="font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">Equipo Asignado</span>
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
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-green-100 p-4 sm:p-6">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{employees.length}</p>
                  <p className="text-sm text-gray-600">Total Empleados</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center">
                  <Laptop className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{employees.length}</p>
                  <p className="text-sm text-gray-600">Equipos Asignados</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{employees.filter(e => e.authorized).length}</p>
                  <p className="text-sm text-gray-600">Autorizados</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{employees.length}</p>
                  <p className="text-sm text-gray-600">Activos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por empleado, ID, cargo, centro de costo, marca, modelo o serial..."
              className="w-full pl-12 pr-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-100/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-emerald-600 to-green-700">
                <tr>
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
                {filteredEmployees.map((employee, index) => (
                  <tr key={employee.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-green-50/30'} hover:bg-green-50 transition-colors`}>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl flex items-center justify-center">
                          <Hash className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-sm font-mono font-bold text-gray-900">
                          {employee.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 break-words">
                        {formatName(employee.name)}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-900 break-words max-w-xs">
                        {formatPosition(employee.position)}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        {employee.costCenter}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        employee.authorized 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.authorized ? 'SI' : 'NO'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {employee.brand}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-900 break-words max-w-xs">
                        {employee.model}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {employee.serial}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewEmployee(employee)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-md"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No se encontraron empleados</p>
              <p className="text-gray-400 text-sm mt-1">Intenta con otros términos de búsqueda</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Total de registros: <span className="font-semibold">{filteredEmployees.length}</span> de <span className="font-semibold">{employees.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
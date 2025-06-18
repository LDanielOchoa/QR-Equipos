import type React from "react"
import { Users, Laptop, Shield, Clock } from "lucide-react"
import type { Employee } from "../../types/employee"
interface StatsCardsProps {
  employees: Employee[]
}

export const StatsCards: React.FC<StatsCardsProps> = ({ employees }) => {
  const authorizedCount = employees.filter((e) => e.authorized).length

  const stats = [
    {
      title: "Total Empleados",
      value: employees.length,
      icon: Users,
      bgColor: "from-emerald-100 to-green-200",
      iconColor: "text-emerald-600",
    },
    {
      title: "Equipos Asignados",
      value: employees.length,
      icon: Laptop,
      bgColor: "from-green-100 to-emerald-200",
      iconColor: "text-green-600",
    },
    {
      title: "Autorizados",
      value: authorizedCount,
      icon: Shield,
      bgColor: "from-emerald-100 to-green-200",
      iconColor: "text-emerald-600",
    },
    {
      title: "Activos",
      value: employees.length,
      icon: Clock,
      bgColor: "from-blue-100 to-indigo-200",
      iconColor: "text-blue-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-green-100/50">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

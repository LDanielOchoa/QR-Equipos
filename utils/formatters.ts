export const formatName = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }
  
  export const formatPosition = (position: string): string => {
    return position
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }
  
  export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  
  export const generateEmployeeURL = (employeeId: string): string => {
    const baseURL = window.location.origin + window.location.pathname
    return `${baseURL}?employee=${employeeId}`
  }
  
export const obtenerFecha = (suma = 0) => {
    const hoy = new Date();
  
    const a = hoy.getFullYear();
    const m = (hoy.getMonth() + 1).toString().padStart(2, "0");
    const d = (hoy.getDate() + suma).toString().padStart(2, "0");
  
    return `${a}-${m}-${d}`;
  };
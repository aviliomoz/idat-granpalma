import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerFecha } from "../functions/fechas";

export function BarraBusqueda() {
  const [fechaLlegada, setFechaLlegada] = useState(obtenerFecha());
  const [fechaSalida, setFechaSalida] = useState(obtenerFecha());
  const [cantidadAdultos, setCantidadAdultos] = useState(1);
  const [cantidadInfantes, setCantidadInfantes] = useState(0);

  useEffect(() => {
    if (fechaSalida <= fechaLlegada) {
      setFechaSalida(obtenerFecha(fechaLlegada, 1));
    }
  }, [fechaLlegada]);

  return (
    <form className="bg-white p-10 rounded-md flex gap-6 items-center">
      <label>
        <span className="font-semibold">Llegada:</span>
        <input
          className="border-slate-200 border px-3 py-1 rounded-md ml-3 w-36"
          type="date"
          value={fechaLlegada}
          min={obtenerFecha()}
          onChange={(e) => setFechaLlegada(e.target.value)}
        />
      </label>
      <label>
        <span className="font-semibold">Salida:</span>
        <input
          className="border-slate-200 border px-3 py-1 rounded-md ml-3 w-36"
          type="date"
          value={fechaSalida}
          min={obtenerFecha(fechaLlegada, 1)}
          onChange={(e) => setFechaSalida(e.target.value)}
        />
      </label>
      <label>
        <span className="font-semibold">Adultos:</span>
        <input
          className="border-slate-200 border px-3 py-1 rounded-md ml-3 w-16"
          type="number"
          min={1}
          value={cantidadAdultos}
          onChange={(e) => {
            if (parseInt(e.target.value) < 1) {
              setCantidadAdultos(1);
            } else {
              setCantidadAdultos(parseInt(e.target.value));
            }
          }}
        />
      </label>
      <label>
        <span className="font-semibold">Niños:</span>
        <input
          className="border-slate-200 border px-3 py-1 rounded-md ml-3 w-16"
          type="number"
          min={0}
          value={cantidadInfantes}
          onChange={(e) => setCantidadInfantes(parseInt(e.target.value))}
        />
      </label>
      <Link
      className="bg-slate-950 hover:bg-slate-900 px-12 py-1 rounded-md text-white"
        to={`/habitaciones?llegada=${fechaLlegada}&salida=${fechaSalida}&adultos=${cantidadAdultos}&infantes=${cantidadInfantes}`}
      >
        Buscar
      </Link>
    </form>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerFecha } from "../functions/fechas";

export function BarraBusqueda() {
  const [fechaLlegada, setFechaLlegada] = useState(obtenerFecha());
  const [fechaSalida, setFechaSalida] = useState(obtenerFecha(3));
  const [cantidadAdultos, setCantidadAdultos] = useState(1);
  const [cantidadInfantes, setCantidadInfantes] = useState(0);

  useEffect(() => {
    if (fechaSalida < fechaLlegada) {
      setFechaSalida(fechaLlegada);
    }
  }, [fechaLlegada]);

  return (
    <form className="barra-busqueda">
      <label>
        <span>Llegada:</span>
        <input
          className="input-fecha"
          type="date"
          value={fechaLlegada}
          min={obtenerFecha()}
          onChange={(e) => setFechaLlegada(e.target.value)}
        />
      </label>
      <label>
        <span>Salida:</span>
        <input
          className="input-fecha"
          type="date"
          value={fechaSalida}
          min={fechaLlegada}
          onChange={(e) => setFechaSalida(e.target.value)}
        />
      </label>
      <label>
        <span>Adultos:</span>
        <input
          className="input-numero"
          type="number"
          min={1}
          value={cantidadAdultos}
          onChange={(e) => {
            if (e.target.value < 1) {
              setCantidadAdultos(1);
            } else {
              setCantidadAdultos(e.target.value);
            }
          }}
        />
      </label>
      <label>
        <span>Niños:</span>
        <input
          className="input-numero"
          type="number"
          min={0}
          value={cantidadInfantes}
          onChange={(e) => setCantidadInfantes(e.target.value)}
        />
      </label>
      <Link
        to={`/habitaciones?llegada=${fechaLlegada}&salida=${fechaSalida}&adultos=${cantidadAdultos}&infantes=${cantidadInfantes}`}
      >
        Buscar
      </Link>
    </form>
  );
}

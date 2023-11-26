import { TarjetaHabitacion } from "../components/tarjeta-habitacion";
import { Filtros } from "../components/filtros";
import { useEffect, useState } from "react";
import { useFiltros } from "../hooks/useFiltros";
import {
  obtenerHabitaciones,
  obtenerHabitacionesDisponibles,
} from "../functions/habitaciones";

export function ResultadosPage() {
  const filtros = useFiltros();

  const [habitaciones, setHabitaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerHabitacionesDisponibles(filtros)
      .then(setHabitaciones)
      .finally(() => setCargando(false));
    // obtenerHabitaciones().then(setHabitaciones);
  }, []);

  return (
    <>
      <section className="resultados">
        <div className="resultados_titulo">
          <h3>Resultados de la búsqueda:</h3>
          <Filtros />
        </div>
        <div className="resultados_habitaciones">
          {!cargando && habitaciones.length == 0 && (
            <p className="mensaje_sin_resultados">
              No hay habitaciones disponibles para las fechas y/o número de
              huéspedes seleccionados.
            </p>
          )}
          {habitaciones.map((habitacion) => {
            return <TarjetaHabitacion key={habitacion.id} id={habitacion.id} />;
          })}
        </div>
      </section>
    </>
  );
}

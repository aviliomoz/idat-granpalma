import { TarjetaHabitacion } from "../components/tarjeta-habitacion";
import { Filtros } from "../components/filtros";
import { useEffect, useState } from "react";
import { useFiltros } from "../hooks/useFiltros";
import { obtenerHabitacionesDisponibles } from "../functions/habitaciones";
import { Habitacion } from "../types";

export function ResultadosPage() {
  const filtros = useFiltros();

  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerHabitacionesDisponibles(filtros)
      .then(setHabitaciones)
      .finally(() => setCargando(false));
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

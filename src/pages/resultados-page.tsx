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
      <section>
        <div className="rounded-md my-4 py-4 px-8 flex items-center justify-between">
          <h3 className="font-semibold">Resultados de la búsqueda:</h3>
          <Filtros />
        </div>
        <div className="flex flex-wrap gap-8 px-12 py-6 min-h-[350px] pb-20">
          {!cargando && habitaciones.length == 0 && (
            <p className="text-center text-gray-700 mt-20">
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

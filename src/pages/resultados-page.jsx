import { TarjetaHabitacion } from "../components/tarjeta-habitacion";
import { Filtros } from "../components/filtros";
import { useEffect, useState } from "react";
import { useFiltro } from "../hooks/useFiltro";
import { useHabitaciones } from "../hooks/useHabitaciones";

export function ResultadosPage() {
  const { llegada, salida, adultos, infantes } = useFiltro();

  const { habitaciones } = useHabitaciones(llegada, salida, adultos + infantes);

  return (
    <>
      <section className="resultados">
        <div className="resultados_titulo">
          <h3>Resultados de la búsqueda:</h3>
          <Filtros />
        </div>
        <div className="resultados_habitaciones">
          {habitaciones.map((habitacion) => {
            return (
              <TarjetaHabitacion key={habitacion.id} habitacion={habitacion} />
            );
          })}
        </div>
      </section>
    </>
  );
}

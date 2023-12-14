import { useEffect, useState } from "react";
import { Habitacion } from "../types";
import { obtenerHabitaciones } from "../functions/habitaciones";
import { EstadoHabitacion } from "./estado-habitacion";

type Props = {
  tipo: string;
  estado: string;
};

export function ListaHabitaciones({ tipo, estado }: Props) {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);

  useEffect(() => {
    obtenerHabitaciones().then((habitaciones) =>
      setHabitaciones(
        habitaciones
          .filter((habitacion) => {
            if (estado === "Todas") {
              return habitacion;
            } else {
              if (estado === "Activas" && habitacion.estado === true)
                return habitacion;
              if (estado === "Inactivas" && habitacion.estado === false)
                return habitacion;
            }
          })
          .filter((habitacion) => {
            if (tipo === "Todas") {
              return habitacion;
            } else {
              if (habitacion.nombre === tipo) return habitacion;
            }
          })
      )
    );
  }, [tipo, estado]);

  return (
    <ul className="grid grid-cols-3 gap-5 p-5">
      {habitaciones.map((habitacion) => {
        return <EstadoHabitacion key={habitacion.id} id={habitacion.id} />;
      })}
    </ul>
  );
}

import { useState, useEffect } from "react";
import { Habitacion } from "../types";
import { obtenerHabitacionPorId } from "../functions/habitaciones";
import { obtenerReservas } from "../functions/reservas";
import { useFecha } from "../hooks/useFecha";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

type Props = {
  id: number;
};

export function EstadoHabitacion({ id }: Props) {
  const { fecha } = useFecha();
  const [habitacion, setHabitacion] = useState<Habitacion>();
  const [reservada, setReservada] = useState<boolean>(false);

  useEffect(() => {
    obtenerHabitacionPorId(id).then(
      (habitacion) => habitacion && setHabitacion(habitacion)
    );
  }, []);

  useEffect(() => {
    if (habitacion) {
      obtenerReservas().then((reservas) => {
        const listado = reservas
          .filter((reserva) => reserva.estado)
          .filter((reserva) => reserva.habitacion_id === habitacion.id)
          .filter((reserva) => {
            if (
              dayjs(reserva.fecha_llegada, "YYYY-MM-DD") <= fecha &&
              dayjs(reserva.fecha_salida, "YYYY-MM-DD") >= fecha
            ) {
              return reserva;
            }
          });

        if (listado.length > 0) {
          setReservada(true);
        } else {
          setReservada(false);
        }
      });
    }
  }, [habitacion, fecha]);

  if (!habitacion) return <></>;

  return (
    <Link
      to={`/dashboard/habitacion/${habitacion.id}`}
      className="border rounded-md p-2 relative"
    >
      {reservada && (
        <span className="absolute -top-2 -right-2 bg-slate-900 text-white px-3 py-1 rounded-md">
          Reservada
        </span>
      )}
      <img
        src={habitacion.imagenes[0].url || ""}
        className="rounded-md w-full h-32"
      />
      <div className="mt-4">
        <p className="text-sm font-medium">{habitacion.nombre}</p>
        <p className={`text-sm`}>
          <span className="font-medium mr-2">Estado:</span>
          <span
            className={` font-medium ${
              habitacion.estado ? "text-green-500" : "text-red-500"
            }`}
          >
            {habitacion.estado ? "Activa" : "Inactiva"}
          </span>
        </p>
      </div>
    </Link>
  );
}

import { useEffect, useState } from "react";
import { FiltrosHabitacion } from "../components/filtros-habitacion";
import { useFiltrosHab } from "../hooks/useFiltrosHab";
import { Reserva } from "../types";
import { obtenerReservas } from "../functions/reservas";
import { Outlet } from "react-router-dom";
import { TarjetaReserva } from "../components/tarjeta-reserva";
import dayjs from "dayjs";

export function ReservasLayout() {
  const { estado, tipo, cambiarEstado, cambiarTipo } = useFiltrosHab();
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    obtenerReservas().then(setReservas);
  }, []);

  const handleAnular = (id: string) => {
    setReservas(
      reservas.map((reserva) =>
        reserva.id === id ? { ...reserva, estado: false } : reserva
      )
    );
  };

  return (
    <section className=" rounded-md m-3 flex gap-3">
      <div className="w-8/12">
        <div className="flex gap-20 justify-between p-6 bg-white rounded-md">
          <h3 className="text-lg font-semibold">Reservas</h3>
          <FiltrosHabitacion
            estado={estado}
            tipo={tipo}
            cambiarEstado={cambiarEstado}
            cambiarTipo={cambiarTipo}
          />
        </div>
        <ul className="p-6 bg-white rounded-md mt-3">
          {reservas
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
            .sort(
              (a, b) =>
                // @ts-ignore
                dayjs(b.fecha_llegada, "YYYY-MM-DD") -
                // @ts-ignore
                dayjs(a.fecha_llegada, "YYYY-MM-DD")
            )
            // @ts-ignore
            .sort((a, b) => b.estado - a.estado)
            .map((reserva) => (
              <TarjetaReserva
                key={reserva.id}
                filtroTipo={tipo}
                reserva={reserva}
                anular={handleAnular}
              />
            ))}
        </ul>
      </div>
      <div className="w-4/12">
        <Outlet />
      </div>
    </section>
  );
}

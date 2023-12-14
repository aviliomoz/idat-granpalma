import { useState, useEffect } from "react";
import { useFecha } from "../hooks/useFecha";
import { obtenerHabitaciones } from "../functions/habitaciones";
import { obtenerReservas } from "../functions/reservas";
import dayjs from "dayjs";

export function WidgetDatos() {
  const { fecha } = useFecha();

  const [habitacionesTotales, setHabitacionesTotales] = useState<number>(0);
  const [habitacionesOcupadas, setHabitacionesOcupadas] = useState<number>(0);
  const [habitacionesDisponibles, setHabitacionesDisponibles] =
    useState<number>(0);
  const [huespedes, setHuespedes] = useState<number>(0);

  useEffect(() => {
    obtenerHabitaciones().then((habitaciones) =>
      setHabitacionesTotales(habitaciones.length)
    );
  }, [fecha]);

  useEffect(() => {
    obtenerReservas().then((reservas) => {
      setHabitacionesOcupadas(
        reservas
          .filter((reserva) => reserva.estado === true)
          .filter(
            (reserva) =>
              dayjs(reserva.fecha_llegada, "YYYY-MM-DD") <= fecha &&
              dayjs(reserva.fecha_salida, "YYYY-MM-DD") >= fecha
          ).length
      );
    });
  }, [fecha]);

  useEffect(() => {
    setHabitacionesDisponibles(habitacionesTotales - habitacionesOcupadas);
  }, [habitacionesTotales, habitacionesOcupadas]);

  useEffect(() => {
    obtenerReservas().then((reservas) => {
      setHuespedes(
        reservas
          .filter((reserva) => reserva.estado === true)
          .filter(
            (reserva) =>
              dayjs(reserva.fecha_llegada, "YYYY-MM-DD") <= fecha &&
              dayjs(reserva.fecha_salida, "YYYY-MM-DD") >= fecha
          )
          .reduce((counter, reserva) => {
            return counter + reserva.huespedes;
          }, 0)
      );
    });
  }, [fecha]);

  return (
    <div className="bg-white p-4 rounded-md">
      <h3 className="text-sm font-medium mb-4">Estado actual:</h3>
      <ul>
        <li className="flex gap-3 min-w-max items-center mb-4">
          <span className="bg-slate-100 w-6 h-6 flex justify-center items-center font-medium rounded-md">
            {habitacionesTotales}
          </span>
          <p className="text-sm">Habitaciones totales</p>
        </li>
        <li className="flex gap-3 min-w-max items-center mb-4">
          <span className="bg-slate-100 w-6 h-6 flex justify-center items-center font-medium rounded-md">
            {habitacionesOcupadas}
          </span>
          <p className="text-sm">Habitaciones reservadas</p>
        </li>
        <li className="flex gap-3 min-w-max items-center mb-4">
          <span className="bg-slate-100 w-6 h-6 flex justify-center items-center font-medium rounded-md">
            {habitacionesDisponibles}
          </span>
          <p className="text-sm">Habitaciones disponibles</p>
        </li>
        <li className="flex gap-3 min-w-max items-center mb-4">
          <span className="bg-slate-100 w-6 h-6 flex justify-center items-center font-medium rounded-md">
            {huespedes}
          </span>
          <p className="text-sm">Huéspedes totales</p>
        </li>
      </ul>
    </div>
  );
}

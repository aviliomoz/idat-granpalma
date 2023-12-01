import dayjs from "dayjs";

import { obtenerReservas } from "./reservas";
import { obtenerImagenesPorHabitacion } from "./imagenes";

const url = "http://localhost:9797/habitaciones";

export const obtenerHabitaciones = async () => {
  const res = await fetch(url, {});
  const data = await res.json();

  return data;
};

export const obtenerHabitacionesDisponibles = async (filtros) => {
  const habitaciones = await obtenerHabitaciones();
  const reservas = await obtenerReservas();

  const filtro_fecha_llegada = dayjs(filtros.llegada, "YYYY-MM-DD");
  const filtro_fecha_salida = dayjs(filtros.salida, "YYYY-MM-DD");

  const resultados = await habitaciones
    .filter(
      (habitacion) =>
        habitacion.estado == true &&
        habitacion.capacidad >= filtros.adultos + filtros.infantes
    )
    .filter((habitacion) => {
      let disponible = true;

      reservas
        .filter((reserva) => reserva.estado == true)
        .map((reserva) => {
          const reserva_fecha_llegada = dayjs(
            reserva.fecha_llegada,
            "YYYY-MM-DD"
          );
          const reserva_fecha_salida = dayjs(
            reserva.fecha_salida,
            "YYYY-MM-DD"
          );

          if (reserva.habitacion_id == habitacion.id) {
            if (
              (filtro_fecha_llegada >= reserva_fecha_llegada &&
                filtro_fecha_llegada <= reserva_fecha_salida) ||
              (filtro_fecha_salida >= reserva_fecha_llegada &&
                filtro_fecha_salida <= reserva_fecha_salida)
            ) {
              disponible = false;
            }
          }
        });

      return disponible && habitacion;
    });

  return resultados;
};

export const obtenerHabitacionPorId = async (id) => {
  const res = await fetch(url + `/${id}`, {});
  const habitacion = await res.json();

  const imagenes = (await obtenerImagenesPorHabitacion(habitacion.id)) || [];

  return { ...habitacion, imagenes };
};

export const crearHabitacion = async (habitacion) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habitacion),
    
  });

  const data = await res.json();

  return data;
};

export const actualizarHabitacion = async (id, habitacion) => {
  const res = await fetch(url + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habitacion),
    
  });

  const data = await res.json();

  return data;
};

export const desactivarHabitacion = async (id) => {
  const habitacion = await obtenerHabitacionPorId(id);

  const res = await fetch(url + `/${habitacion.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...habitacion, estado: false }),
    
  });

  const data = await res.json();

  return data;
};

export const activarHabitacion = async (id) => {
  const habitacion = await obtenerHabitacionPorId(id);

  const res = await fetch(url + habitacion.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...habitacion, estado: true }),
    
  });

  const data = await res.json();

  return data;
};

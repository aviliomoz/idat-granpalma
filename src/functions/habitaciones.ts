import dayjs from "dayjs";

import { obtenerReservas } from "./reservas";
import { obtenerImagenesPorHabitacion } from "./imagenes";
import { Filtro, Habitacion } from "../types";
import toast from "react-hot-toast";

const url = "http://localhost:9797/habitaciones";

export const obtenerHabitaciones = async () => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();

    const data: Habitacion[] = await res.json();

    return data;
  } catch (error) {
    toast.error("Error al obtener las habitaciones");
    return [];
  }
};

export const obtenerHabitacionesDisponibles = async (filtro: Filtro) => {
  try {
    const habitaciones = await obtenerHabitaciones();
    const reservas = await obtenerReservas();

    if (!habitaciones || !reservas) throw new Error();

    const filtro_fecha_llegada = dayjs(filtro.llegada, "YYYY-MM-DD");
    const filtro_fecha_salida = dayjs(filtro.salida, "YYYY-MM-DD");

    const resultados = habitaciones
      .filter(
        (habitacion) =>
          habitacion.estado == true &&
          habitacion.capacidad >= filtro.adultos + filtro.infantes
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
  } catch (error) {
    toast.error("Error al obtener las habitaciones disponibles");
    return [];
  }
};

export const obtenerHabitacionPorId = async (id: number) => {
  try {
    const res = await fetch(`${url}/${id}`);
    if (!res.ok) throw new Error();

    const habitacion: Habitacion = await res.json();

    const imagenes = await obtenerImagenesPorHabitacion(habitacion.id);

    return { ...habitacion, imagenes };
  } catch (error) {
    toast.error("Error al obtener la habitación");
    return null;
  }
};

export const crearHabitacion = async (habitacion: Partial<Habitacion>) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitacion),
    });

    if (!res.ok) throw new Error();

    const data: Habitacion = await res.json();

    return data;
  } catch (error) {
    toast.error("Error al crear la habitación");
    return null;
  }
};

export const actualizarHabitacion = async (habitacion: Habitacion) => {
  try {
    const res = await fetch(`${url}/${habitacion.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitacion),
    });

    if (!res.ok) throw new Error();

    const data: Habitacion = await res.json();

    return data;
  } catch (error) {
    toast.error("Error al actualizar la habitación");
    return null;
  }
};

export const desactivarHabitacion = async (id: number) => {
  try {
    const habitacion = await obtenerHabitacionPorId(id);

    if (!habitacion) throw new Error();

    const res = await fetch(url + `/${habitacion.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...habitacion, estado: false }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    toast.error("Error al desactivar la habitación");
    return null;
  }
};

export const activarHabitacion = async (id: number) => {
  try {
    const habitacion = await obtenerHabitacionPorId(id);

    if (!habitacion) throw new Error();

    const res = await fetch(url + `/${habitacion.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...habitacion, estado: true }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    toast.error("Error al activar la habitación");
    return null;
  }
};

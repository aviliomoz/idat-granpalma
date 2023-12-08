// import toast from "react-hot-toast";
import { Reserva } from "../types";

const url = "http://localhost:9797/reservas";

function generarCodigoAleatorio() {
  const longitud = 6;
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let codigoAleatorio = "";

  for (let i = 0; i < longitud; i++) {
    const caracterAleatorio = caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
    codigoAleatorio += caracterAleatorio;
  }

  return codigoAleatorio;
}

export const obtenerReservas = async () => {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error();

    const data: Reserva[] = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al obtener las reservas");
    return [];
  }
};

export const obtenerReservaPorId = async (id: string) => {
  try {
    const res = await fetch(`${url}/${id}`);
    if (!res.ok) throw new Error();

    const data: Reserva = await res.json();

    return data;
    // return Object.entries(data).length == 0 ? null : data;
  } catch (error) {
    // toast.error("Error al obtener la reserva");
    return null;
  }
};

export const crearReserva = async (datos_reserva: Omit<Reserva, "id">) => {
  try {
    const codigo = generarCodigoAleatorio();

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cliente_id: datos_reserva.cliente_id,
        habitacion_id: datos_reserva.habitacion_id,
        fecha_llegada: datos_reserva.fecha_llegada,
        fecha_salida: datos_reserva.fecha_salida,
        huespedes: datos_reserva.huespedes,
        estado: datos_reserva.estado,
        id: codigo,
      }),
    });

    if (!res.ok) throw new Error();

    const data: Reserva = await res.json();

    console.log(data)
    return data;
  } catch (error) {
    // toast.error("Error al crear la reserva");
    return null;
  }
};

export const actualizarReserva = async (reserva: Reserva) => {
  try {
    const res = await fetch(`${url}/${reserva.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reserva),
    });

    if (!res.ok) throw new Error();

    const data: Reserva = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al actualizar la reserva");
    return null;
  }
};

export const desactivarReserva = async (id: string) => {
  try {
    const reserva = await obtenerReservaPorId(id);

    if (!reserva) throw new Error();

    const res = await fetch(`${url}/${reserva.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...reserva, estado: false }),
    });

    if (!res.ok) throw new Error();

    const data: Reserva = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al desactivar la reserva");
    return null;
  }
};

export const activarReserva = async (id: string) => {
  try {
    const reserva = await obtenerReservaPorId(id);

    if (!reserva) throw new Error();

    const res = await fetch(`${url}/${reserva.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...reserva, estado: true }),
    });

    if (!res.ok) throw new Error();

    const data: Reserva = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al activar la reserva");
    return null;
  }
};

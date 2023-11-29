import { crearCliente } from "./clientes";

const url = "http://localhost:9797/reservas/";

function generarCodigoAleatorio() {
  const longitud = 6;
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
  const res = await fetch(url, {});
  const data = await res.json();

  return data;
};

export const obtenerReservaPorId = async (id) => {
  const res = await fetch(url + id, {});
  const data = await res.json();

  return data;
};

export const crearReserva = async (reserva) => {
  const cliente = await crearCliente(reserva.cliente);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cliente_id: cliente.id,
      habitacion_id: reserva.habitacion_id,
      fecha_llegada: reserva.fecha_llegada,
      fecha_salida: reserva.fecha_salida,
      huespedes: reserva.huespedes,
      estado: true,
      id: generarCodigoAleatorio(),
    }),
    
  });

  const data = await res.json();

  return data;
};

export const actualizarReserva = async (id, reserva) => {
  const res = await fetch(url + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva),
    
  });

  const data = await res.json();

  return data;
};

export const desactivarReserva = async (id) => {
  const reserva = await obtenerReservaPorId(id);

  const res = await fetch(url + reserva.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...reserva, estado: false }),
    
  });

  const data = await res.json();

  return data;
};

export const activarReserva = async (id) => {
  const reserva = await obtenerReservaPorId(id);

  const res = await fetch(url + reserva.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...reserva, estado: true }),
    
  });

  const data = await res.json();

  return data;
};

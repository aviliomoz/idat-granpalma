import "../styles/components/formulario-reserva.css";

import { useState } from "react";
import { useFiltro } from "../hooks/useFiltro";

export function FormularioReserva({ habitacion }) {
  const { llegada, salida, adultos, infantes } = useFiltro();

  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");

  const crearCliente = (cliente) => {
    console.log({
      dni: cliente.dni,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      celular: cliente.celular,
      correo: cliente.correo,
    });

    return { ...cliente, id: 1 };
  };

  const reservar = (e) => {
    e.preventDefault();

    const cliente = crearCliente({
      dni,
      nombre,
      apellido,
      celular,
      correo,
    });

    console.log({
      cliente_id: cliente.id,
      habitacion_id: habitacion.id_habitaciones,
      fechaLlegada: llegada,
      fechaSalida: salida,
      huespedes: parseInt(adultos) + parseInt(infantes),
    });
  };

  return (
    <form onSubmit={reservar} className="formulario-reserva">
      <h4>Completa tu reserva:</h4>
      <label>
        <span>DNI:</span>
        <input
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
      </label>
      <label>
        <span>Nombre:</span>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <label>
        <span>Apellido:</span>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </label>
      <label>
        <span>Celular:</span>
        <input
          type="text"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
        />
      </label>
      <label>
        <span>Correo:</span>
        <input
          type="text"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </label>
      <button type="submit">Reservar</button>
    </form>
  );
}

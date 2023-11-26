import "../styles/components/formulario-reserva.css";

import { useState } from "react";
import { useFiltros } from "../hooks/useFiltros";
import { crearReserva } from "../functions/reservas";

export function FormularioReserva({ habitacion }) {
  const { llegada, salida, adultos, infantes } = useFiltros();

  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");

  const reservar = (e) => {
    e.preventDefault();

    const datos_reserva = {
      cliente: {
        dni,
        nombres,
        apellidos,
        celular,
        correo,
      },
      habitacion_id: habitacion.id,
      fecha_llegada: llegada,
      fecha_salida: salida,
      huespedes: adultos + infantes,
    };

    crearReserva(datos_reserva).then((data) =>
      alert("Reserva registrada correctamente con el codigo: " + data.id)
    );
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
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
        />
      </label>
      <label>
        <span>Apellido:</span>
        <input
          type="text"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
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

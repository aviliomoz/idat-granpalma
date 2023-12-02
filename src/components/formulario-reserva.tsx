import "../styles/components/formulario-reserva.css";

import { useState } from "react";
import { useFiltros } from "../hooks/useFiltros";
import { crearReserva } from "../functions/reservas";
import { Modal } from "./modal";
import { useParams } from "react-router-dom";
import { Reserva } from "../types";
import { crearCliente } from "../functions/clientes";

export function FormularioReserva() {
  const { id: habitacion_id } = useParams();
  const { llegada, salida, adultos, infantes } = useFiltros();

  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const [modal, setModal] = useState<string>();

  const reservar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!habitacion_id) return;

    try {
      const cliente = await crearCliente({
        dni,
        nombres,
        apellidos,
        telefono,
        email,
      });

      if (!cliente) throw new Error();

      const datos_reserva: Omit<Reserva, "id"> = {
        cliente_id: cliente.id,
        habitacion_id: parseInt(habitacion_id),
        fecha_llegada: llegada,
        fecha_salida: salida,
        huespedes: adultos + infantes,
        estado: true,
      };

      crearReserva(datos_reserva).then((data) => data && setModal(data.id));
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setModal(undefined);
    window.location.assign("/");
  };

  return (
    <>
      {modal && (
        <Modal onClose={handleCloseModal}>
          <strong>Reserva registrada correctamente</strong>
          <p>
            Su código de reserva es: <strong>{modal}</strong>
          </p>
          <button className="modal_aceptar" onClick={handleCloseModal}>
            Aceptar
          </button>
        </Modal>
      )}
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
          <span>Nombres:</span>
          <input
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
        </label>
        <label>
          <span>Apellidos:</span>
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </label>
        <label>
          <span>Teléfono:</span>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Reservar</button>
      </form>
    </>
  );
}
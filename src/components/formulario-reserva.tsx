import { useState } from "react";
import { useFiltros } from "../hooks/useFiltros";
import { crearReserva } from "../functions/reservas";
import { Modal } from "./modal";
import { useParams } from "react-router-dom";
import { Reserva } from "../types";
import { crearCliente } from "../functions/clientes";
import toast from "react-hot-toast";

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

      crearReserva(datos_reserva).then((data) => {
        console.log(data);
        toast.success("Reserva generada exitosamente");
        setModal(data?.id);
      });
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
          <span className="font-semibold">
            Reserva registrada correctamente
          </span>
          <p className="mt-2">
            Su código de reserva es:{" "}
            <span className="font-semibold">{modal}</span>
          </p>
          <div className="flex justify-center">
            <button
              className="bg-slate-950 hover:bg-slate-900 px-16 py-1 rounded text-white mt-6 text-sm w-auto mx-auto"
              onClick={handleCloseModal}
            >
              Aceptar
            </button>
          </div>
        </Modal>
      )}
      <form
        onSubmit={reservar}
        className="flex flex-col border border-slate-300 rounded-md p-6 gap-3 max-w-[350px]"
      >
        <h4 className="font-semibold mb-4">Completa tu reserva:</h4>
        <label>
          <span className="font-semibold mr-2">DNI:</span>
          <input
            className="border border-slate-300 px-3 py-0.5 rounded-md"
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </label>
        <label>
          <span className="font-semibold mr-2">Nombres:</span>
          <input
            className="border border-slate-300 px-3 py-0.5 rounded-md"
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
        </label>
        <label>
          <span className="font-semibold mr-2">Apellidos:</span>
          <input
            className="border border-slate-300 px-3 py-0.5 rounded-md"
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </label>
        <label>
          <span className="font-semibold mr-2">Teléfono:</span>
          <input
            className="border border-slate-300 px-3 py-0.5 rounded-md"
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </label>
        <label>
          <span className="font-semibold mr-2">Email:</span>
          <input
            className="border border-slate-300 px-3 py-0.5 rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button
          className="bg-slate-950 hover:bg-slate-900 text-white px-16 py-1 rounded mt-6"
          type="submit"
        >
          Reservar
        </button>
      </form>
    </>
  );
}

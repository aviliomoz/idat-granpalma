import { useEffect, useState } from "react";
import { Cliente, Habitacion, Reserva } from "../types";
import { obtenerHabitacionPorId } from "../functions/habitaciones";
import { obtenerClientePorId } from "../functions/clientes";
import { Modal } from "./modal";
import { desactivarReserva } from "../functions/reservas";
import toast from "react-hot-toast";

type Props = {
  reserva: Reserva;
  filtroTipo: string;
  anular: (id: string) => void;
};

export function TarjetaReserva({ reserva, filtroTipo, anular }: Props) {
  const [habitacion, setHabitacion] = useState<Habitacion>();
  const [cliente, setCliente] = useState<Cliente>();
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    obtenerHabitacionPorId(reserva.habitacion_id).then(
      (habitacion) => habitacion && setHabitacion(habitacion)
    );
  }, []);

  useEffect(() => {
    obtenerClientePorId(reserva.cliente_id).then(
      (cliente) => cliente && setCliente(cliente)
    );
  }, []);

  const handleAnular = () => {
    setModal(false);
    reserva.id &&
      desactivarReserva(reserva.id).then(() => {
        toast.success("Se anuló la reserva correctamente.");
        anular(reserva.id);
      });
  };

  if (!habitacion || !cliente) return <></>;

  if (filtroTipo === "Todas" || filtroTipo === habitacion.nombre) {
    return (
      <>
        {modal && (
          <Modal onClose={() => setModal(false)}>
            <p>¿Estás seguro de que quieres anular la reserva?</p>
            {/* <button className="modal_cancelar" onClick={() => setModal(false)}>Cancelar</button> */}
            <div className="flex justify-center">
              <button
                className="bg-slate-950 hover:bg-slate-900 px-16 py-1 rounded text-white mt-6 text-sm w-auto mx-auto"
                onClick={handleAnular}
              >
                Eliminar
              </button>
            </div>
          </Modal>
        )}
        <li className="border rounded-md mb-3 py-4 px-6 text-sm flex gap-6 w-full justify-between">
          <div>
            <p>
              <span className="font-medium mr-2">Código:</span>
              {reserva.id}
            </p>
            <p>
              <span className="font-medium mr-2">Fecha de llegada:</span>
              {reserva.fecha_llegada}
            </p>
            <p>
              <span className="font-medium mr-2">Fecha de salida:</span>
              {reserva.fecha_salida}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium mr-2">Habitación:</span>
              {`N° ${habitacion.id} (${habitacion.nombre.replace(
                "Habitación ",
                ""
              )})`}
            </p>
            <p>
              <span className="font-medium mr-2">Cliente:</span>
              {cliente.nombres + " " + cliente.apellidos}
            </p>
            <p>
              <span className="font-medium mr-2">DNI:</span>
              {cliente.dni}
            </p>
          </div>
          <div className="flex flex-col justify-between items-end">
            <p className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  reserva.estado ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              {reserva.estado ? "Activa" : "Inactiva"}
            </p>
            {reserva.estado && (
              <button
                onClick={() => setModal(true)}
                className="text-white bg-slate-900 hover:bg-slate-800 px-6 py-1 rounded-md"
              >
                Anular
              </button>
            )}
          </div>
        </li>
      </>
    );
  } else {
    return <></>;
  }
}

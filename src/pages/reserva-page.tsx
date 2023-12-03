import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { desactivarReserva, obtenerReservaPorId } from "../functions/reservas";
import { obtenerClientePorId } from "../functions/clientes";
import { obtenerHabitacionPorId } from "../functions/habitaciones";
import { Modal } from "../components/modal";
import toast from "react-hot-toast";
import { Cliente, Habitacion, Reserva } from "../types";
import dayjs from "dayjs";
import { Trash } from "lucide-react";

export function ReservaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState<Cliente | undefined>();
  const [reserva, setReserva] = useState<Reserva | undefined>();
  const [habitacion, setHabitacion] = useState<Habitacion | undefined>();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    id &&
      obtenerReservaPorId(id).then((reserva) => {
        reserva && setReserva(reserva);
        reserva &&
          obtenerClientePorId(reserva.cliente_id).then((cliente) => {
            cliente && setCliente(cliente);
            cliente &&
              obtenerHabitacionPorId(reserva.habitacion_id).then(
                (habitacion) => {
                  habitacion && setHabitacion(habitacion);
                }
              );
          });
      });
  }, []);

  const handleAnular = () => {
    setModal(false);
    id && desactivarReserva(id);
    navigate("/");
    toast.success("Se anuló la reserva correctamente.");
  };

  if (!cliente || !reserva || !habitacion) return <></>;

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <p>¿Estás seguro de que quieres anular la reserva?</p>
          {/* <button className="modal_cancelar" onClick={() => setModal(false)}>Cancelar</button> */}
          <div className="flex justify-center">
          <button className="bg-slate-950 hover:bg-slate-900 px-16 py-1 rounded text-white mt-6 text-sm w-auto mx-auto" onClick={handleAnular}>
            Eliminar
          </button>
          </div>
        </Modal>
      )}
      <section className="flex justify-center items-center flex-col gap-8 pt-10 mb-20">
        <h3 className="text-xl font-medium">Tu reserva:</h3>
        <div className="border border-slate-300 rounded-md py-8 px-14 flex gap-16">
          <div>
            <h4 className="font-semibold mb-4">Datos del cliente:</h4>
            <p>
              <span className="font-semibold">DNI: </span>
              {cliente.dni}
            </p>
            <p>
              <span className="font-semibold">Nombres: </span>
              {cliente.nombres}
            </p>
            <p>
              <span className="font-semibold">Apellidos: </span>
              {cliente.apellidos}
            </p>
            <p>
              <span className="font-semibold">Celular: </span>
              {cliente.telefono}
            </p>
            <p>
              <span className="font-semibold">Correo: </span>
              {cliente.email}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Datos de la reserva:</h4>
            <p>
              <span className="font-semibold">Código: </span>
              {reserva.id}
            </p>
            <p>
              <span className="font-semibold">Fecha de llegada: </span>
              {reserva.fecha_llegada}
            </p>
            <p>
              <span className="font-semibold">Fecha de salida: </span>
              {reserva.fecha_salida}
            </p>
            <p>
              <span className="font-semibold">Cantidad de huéspedes: </span>
              {reserva.huespedes}
            </p>
            <p>
              <span className="font-semibold">Habitación: </span>
              {habitacion.nombre}
            </p>
            <p>
              <span className="font-semibold">Precio por noche: </span>
              S/{habitacion.precio.toFixed(2)}
            </p>
            <p>
              <span className="font-semibold">Total a pagar: </span>
              S/
              {(
                dayjs(reserva.fecha_salida, "YYYY-MM-DD").diff(
                  dayjs(reserva.fecha_llegada, "YYYY-MM-DD"),
                  "days"
                ) * habitacion.precio
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <Link to={"/"}>Volver al inicio</Link>
          <button
            className="bg-slate-950 hover:bg-slate-900 text-white px-6 py-1 rounded-md flex items-center gap-3"
            onClick={() => setModal(true)}
          >
            <Trash className="w-4" />
            Anular reserva
          </button>
        </div>
      </section>
    </>
  );
}

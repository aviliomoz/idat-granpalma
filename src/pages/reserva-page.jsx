import "../styles/pages/reserva-page.css";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { desactivarReserva, obtenerReservaPorId } from "../functions/reservas";
import { obtenerClientePorId } from "../functions/clientes";
import { obtenerHabitacionPorId } from "../functions/habitaciones";
import { Modal } from "../components/modal";
import toast from "react-hot-toast";

export function ReservaPage() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [cliente, setCliente] = useState();
  const [reserva, setReserva] = useState();
  const [habitacion, setHabitacion] = useState();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    obtenerReservaPorId(id).then((reserva) => {
      setReserva(reserva);
      obtenerClientePorId(reserva.cliente_id).then((cliente) => {
        setCliente(cliente);
        obtenerHabitacionPorId(reserva.habitacion_id).then((habitacion) => {
          setHabitacion(habitacion);
        });
      });
    });
  }, []);

  const handleAnular = () => {
    setModal(false)
    desactivarReserva(id)
    navigate("/")
    toast.success("Se anuló la reserva correctamente.")
  }

  if (!cliente || !reserva || !habitacion) return <></>;

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <p>Estas seguro de que quieres anular la reserva</p>
          {/* <button className="modal_cancelar" onClick={() => setModal(false)}>Cancelar</button> */}
          <button className="modal_aceptar" onClick={handleAnular}>Eliminar</button>
        </Modal>
      )}
      <section className="reserva-page">
        <h3>Tu reserva:</h3>
        <div className="reserva-page__contenedor">
          <div className="reserva-page__cliente">
            <h4>Datos del cliente:</h4>
            <p>
              <strong>DNI: </strong>
              {cliente.dni}
            </p>
            <p>
              <strong>Nombres: </strong>
              {cliente.nombres}
            </p>
            <p>
              <strong>Apellidos: </strong>
              {cliente.apellidos}
            </p>
            <p>
              <strong>Celular: </strong>
              {cliente.celular}
            </p>
            <p>
              <strong>Correo: </strong>
              {cliente.correo}
            </p>
          </div>
          <div className="reserva-page__reserva">
            <h4>Datos de la reserva:</h4>
            <p>
              <strong>Código: </strong>
              {reserva.id}
            </p>
            <p>
              <strong>Fecha de llegada: </strong>
              {reserva.fecha_llegada}
            </p>
            <p>
              <strong>Fecha de salida: </strong>
              {reserva.fecha_salida}
            </p>
            <p>
              <strong>Cantidad de huéspedes: </strong>
              {reserva.huespedes}
            </p>
            <p>
              <strong>Habitación: </strong>
              {habitacion.nombre}
            </p>
            <p>
              <strong>Precio por noche: </strong>
              S/{habitacion.precio.toFixed(2)}
            </p>
            <p>
              <strong>Total a pagar: </strong>
              S/
              {(50).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="reserva-page__botones">
          <Link to={"/"}>Volver al inicio</Link>
          <button onClick={() => setModal(true)}>Anular reserva</button>
        </div>
      </section>
    </>
  );
}

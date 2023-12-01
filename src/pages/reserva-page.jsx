import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerReservaPorId } from "../functions/reservas";
import { obtenerClientePorId } from "../functions/clientes";
import { obtenerHabitacionPorId } from "../functions/habitaciones";
import dayjs from "dayjs";

export function ReservaPage() {
  const { id } = useParams();

  const [cliente, setCliente] = useState();
  const [reserva, setReserva] = useState();
  const [habitacion, setHabitacion] = useState();

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

  if (!cliente || !reserva || !habitacion) return <></>;

  return (
    <>
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
              S/{habitacion.precio}
            </p>
            <p>
              <strong>Total a pagar: </strong>
              S/
              {(
                dayjs(reserva.fecha_salida, "YYYY-MM-DD").diff(
                  dayjs(reserva.fecha_llegada, "YYYY-MM-DD")
                ) 
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

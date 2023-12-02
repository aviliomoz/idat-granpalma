import "../styles/pages/habitacion-page.css";

import { useEffect, useState } from "react";
import { FormularioReserva } from "../components/formulario-reserva";
import { Filtros } from "../components/filtros";
import { useParams } from "react-router-dom";
import { obtenerHabitacionPorId } from "../functions/habitaciones";
import { Habitacion } from "../types";

export function HabitacionPage() {
  const { id } = useParams();
  const [habitacion, setHabitacion] = useState<Habitacion | undefined>();

  useEffect(() => {
    id &&
      obtenerHabitacionPorId(parseInt(id)).then(
        (habitacion) => habitacion && setHabitacion(habitacion)
      );
  }, []);

  if (!habitacion) return <></>;

  return (
    <>
      <section className="habitacion-page">
        <div className="habitacion-page__encabezado">
          <h3>{habitacion.nombre}</h3>
          <Filtros />
        </div>
        <div className="habitacion-page__contenedor">
          <div className="habitacion-page__contenido">
            <img src={habitacion.imagenes[0]?.url} />
            <div className="habitacion-page__contenido--detalles">
              <h4>Características de la habitación:</h4>
              <p>
                <strong>Descripción:</strong>
                {habitacion.descripcion}
              </p>
              <p>
                <strong>Huéspedes:</strong>1-{habitacion.capacidad}
              </p>
              <p>
                <strong>Precio:</strong>S/{habitacion.precio.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="habitacion-page__formulario">
            <FormularioReserva />
          </div>
        </div>
      </section>
    </>
  );
}

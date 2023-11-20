import "../styles/pages/habitacion-page.css";

import { useEffect, useState } from "react";
import { FormularioReserva } from "../components/formulario-reserva";
import { Filtros } from "../components/filtros";
import { useParams } from "react-router-dom";

export function HabitacionPage() {
  const { id } = useParams();
  const [habitacion, setHabitacion] = useState();

  useEffect(() => {
    fetch(`http://localhost:9797/rest_hab/${id}`).then((res) =>
      res.json().then((habitacion) => setHabitacion(habitacion))
    );
  }, []);

  if (!habitacion) return <></>;

  return (
    <>
      <section className="habitacion-page">
        <div className="habitacion-page__encabezado">
          <h3>{habitacion.descripcion}</h3>
          <Filtros />
        </div>
        <div className="habitacion-page__contenedor">
          <div className="habitacion-page__contenido">
            <img src={habitacion.imagen} />
            <div className="habitacion-page__contenido--detalles">
              <h4>Características de la habitación:</h4>
              <p>
                <strong>Huéspedes:</strong>1-{habitacion.capacidad}
              </p>
              <p>
                <strong>Precio:</strong>S/{habitacion.precio.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="habitacion-page__formulario">
            <FormularioReserva habitacion={habitacion} />
          </div>
        </div>
      </section>
    </>
  );
}

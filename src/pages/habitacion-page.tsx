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
      <section className="mb-20">
        <div className="rounded-md my-4 py-4 px-8 flex items-center justify-between">
          <h3 className="font-semibold">Resultados de la búsqueda:</h3>
          <Filtros />
        </div>
        <div className="flex gap-10 px-16 justify-between">
          <div className="flex flex-col gap-4 w-3/5">
            <img className="rounded" src={habitacion.imagenes[0]?.url} />
            <div className="">
              <h4 className="font-semibold mb-4">
                Características de la habitación:
              </h4>
              <p>
                <span className="font-semibold mr-2">Descripción:</span>
                {habitacion.descripcion}
              </p>
              <p>
                <span className="font-semibold mr-2">Huéspedes:</span>1-
                {habitacion.capacidad}
              </p>
              <p>
                <span className="font-semibold mr-2">Precio:</span>S/
                {habitacion.precio.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="w-2/5 flex justify-end h-max">
            <FormularioReserva />
          </div>
        </div>
      </section>
    </>
  );
}

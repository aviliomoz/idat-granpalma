import { useEffect, useState } from "react";
import { FormularioReserva } from "../components/formulario-reserva";
import { Filtros } from "../components/filtros";
import { useParams } from "react-router-dom";
import { obtenerHabitacionPorId } from "../functions/habitaciones";
import { Habitacion } from "../types";
import datos from "../data/datos.json";
import {
  Bed,
  BedDouble,
  ConciergeBell,
  Heart,
  Home,
  Tv,
  Users,
  Wallet,
} from "lucide-react";

export function HabitacionPage() {
  const { id } = useParams();
  const [info, setInfo] = useState(datos[0]);
  const [habitacion, setHabitacion] = useState<Habitacion | undefined>();

  useEffect(() => {
    id &&
      obtenerHabitacionPorId(parseInt(id)).then(
        (habitacion) => habitacion && setHabitacion(habitacion)
      );
  }, []);

  useEffect(() => {
    if (habitacion) {
      setInfo(datos.find((h) => h.tipo === habitacion.nombre) || datos[0]);
    }
  }, [habitacion]);

  if (!habitacion) return <></>;

  return (
    <>
      <section className="mb-20">
        <div className="rounded-md my-4 py-4 px-8 flex items-center justify-between">
          <h3 className="font-semibold">Resultados de la búsqueda:</h3>
          <Filtros />
        </div>

        <div className="flex gap-2 mt-6">
          <img
            className="rounded w-[650px]"
            src={habitacion.imagenes ? habitacion.imagenes[0].url : ""}
          />
          <div className="w-2/5 flex justify-end h-max">
            <FormularioReserva />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-10">
          <h3 className="font-semibold">Características de la habitación:</h3>
          <div className="flex border rounded-md p-8 gap-16">
            <div className="flex flex-col gap-2">
              <article className="flex gap-3 items-center">
                <Users className="w-4" />
                <span className="font-medium min-w-max">
                  Capacidad de huéspedes:{" "}
                </span>
                <span className="min-w-max">1-{habitacion.capacidad}</span>
              </article>
              <article className="flex gap-3 items-center">
                <Wallet className="w-4" />
                <span className="font-medium ">
                  Precio por noche:
                </span>
                <span className="">S/{habitacion.precio.toFixed(2)}</span>
              </article>
              <article className="flex gap-3 items-center">
                <Bed className="w-4" />
                <span className="font-medium ">Número de camas:</span>
                <span className="">{info.numero_de_camas}</span>
              </article>
              <article className="flex gap-3 items-center">
                <BedDouble className="w-4" />
                <span className="font-medium  min-w-max">
                  Tipo de cama:
                </span>
                <span className="">{info.tipo_de_cama}</span>
              </article>
            </div>
            <div className="flex gap-14">
              <article className="flex gap-3 items-start">
                <Tv className="w-4" />
                <div className="flex flex-col gap-1">
                  <span className="font-medium  w-full">
                    Mobiliario:
                  </span>
                  <ul>
                    {info.mobiliario.map((m) => (
                      <li className="" key={m}>
                        - {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              <article className="flex gap-3 items-start">
                <ConciergeBell className="w-4" />
                <div className="flex flex-col gap-1">
                  <span className="font-medium  w-full">Servicios:</span>
                  <ul>
                    {info.servicios_adicionales.map((m) => (
                      <li className="" key={m}>
                        - {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              <article className="flex gap-3 items-start">
                <Heart className="w-4" />
                <div className="flex flex-col gap-1">
                  <span className="font-medium  w-full">
                    Otras características:
                  </span>
                  <ul>
                    {info.caracteristicas.map((m) => (
                      <li className="" key={m}>
                        - {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

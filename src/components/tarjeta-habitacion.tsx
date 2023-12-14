import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useFiltros } from "../hooks/useFiltros";
import { useEffect, useState } from "react";
import { obtenerHabitacionPorId } from "../functions/habitaciones";
import { Habitacion } from "../types";

type Props = {
  id: number;
};

export function TarjetaHabitacion({ id }: Props) {
  const { llegada, salida, adultos, infantes } = useFiltros();

  const [habitacion, setHabitacion] = useState<Habitacion>();

  useEffect(() => {
    obtenerHabitacionPorId(id).then(
      (habitacion) => habitacion && setHabitacion(habitacion)
    );
  }, []);

  if (!habitacion) return <></>;

  return (
    <article
      key={habitacion.id}
      className="w-[30%] min-w-[300px]: border border-slate-300 p-4 rounded "
    >
      <img className="rounded mb-4 h-44 w-full" src={habitacion.imagenes[0]?.url} />
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{habitacion.nombre}</h4>
        <span className="flex items-center gap-2 min-w-max">
          <User className="w-4" />
          1-{habitacion.capacidad}
        </span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <h4 className="font-semibold">Precio: S/{habitacion.precio}</h4>
        <Link
        className="bg-slate-950 hover:bg-slate-900 px-3 py-1 rounded-md text-white text-sm"
          to={`/habitaciones/${habitacion.id}?llegada=${llegada}&salida=${salida}&adultos=${adultos}&infantes=${infantes}`}
        >
          Ver detalles
        </Link>
      </div>
    </article>
  );
}

import { User } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export function TarjetaHabitacion({ habitacion }) {
  const [searchParams] = useSearchParams();

  return (
    <article key={habitacion.id_habitaciones}>
      <img src={habitacion.imagen} />
      <div>
        <h4>{habitacion.descripcion}</h4>
        <span style={{minWidth: "60px"}}>
          <User />
          1-{habitacion.capacidad}
        </span>
      </div>
      <div>
        <h4>Precio: S/{habitacion.precio}</h4>
        <Link
          to={`/habitaciones/${
            habitacion.id_habitaciones
          }?llegada=${searchParams.get("llegada")}&salida=${searchParams.get(
            "salida"
          )}&adultos=${searchParams.get("adultos")}&infantes=${searchParams.get(
            "infantes"
          )}`}
        >
          Ver detalles
        </Link>
      </div>
    </article>
  );
}

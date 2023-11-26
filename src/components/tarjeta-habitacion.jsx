import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useFiltros } from "../hooks/useFiltros";
import { useEffect, useState } from "react";
import { obtenerHabitacionPorId } from "../functions/habitaciones";

export function TarjetaHabitacion({ id }) {
  const { llegada, salida, adultos, infantes } = useFiltros();

  const [habitacion, setHabitacion] = useState();

  useEffect(() => {
    obtenerHabitacionPorId(id).then(setHabitacion);
  }, []);

  if (!habitacion) return <></>;

  return (
    <article key={habitacion.id_habitaciones}>
      <img src={habitacion.imagenes[0]?.url} />
      <div>
        <h4>{habitacion.nombre}</h4>
        <span style={{ minWidth: "60px" }}>
          <User />
          1-{habitacion.capacidad}
        </span>
      </div>
      <div>
        <h4>Precio: S/{habitacion.precio}</h4>
        <Link
          to={`/habitaciones/${habitacion.id}?llegada=${llegada}&salida=${salida}&adultos=${adultos}&infantes=${infantes}`}
        >
          Ver detalles
        </Link>
      </div>
    </article>
  );
}

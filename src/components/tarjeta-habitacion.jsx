import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useFiltro } from "../hooks/useFiltro";
import { useHabitacion } from "../hooks/useHabitacion";

export function TarjetaHabitacion({ habitacion: h }) {
  const { llegada, salida, adultos, infantes } = useFiltro();
  const { habitacion } = useHabitacion(h);

  return (
    <article key={habitacion.id_habitaciones}>
      <img src={habitacion.imagen} />
      <div>
        <h4>{habitacion.descripcion}</h4>
        <span style={{ minWidth: "60px" }}>
          <User />
          1-{habitacion.capacidad}
        </span>
      </div>
      <div>
        <h4>Precio: S/{habitacion.precio}</h4>
        <Link
          to={`/habitaciones/${habitacion.id_habitaciones}?llegada=${llegada}&salida=${salida}&adultos=${adultos}&infantes=${infantes}`}
        >
          Ver detalles
        </Link>
      </div>
    </article>
  );
}

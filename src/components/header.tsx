import { Link } from "react-scroll";
import { ConsultaBoton } from "./consulta-boton";

const enlaces: { nombre: string; url: string }[] = [
  { nombre: "Galería", url: "galeria" },
  { nombre: "Ubicación", url: "ubicacion" },
  { nombre: "Contacto", url: "contacto" },
];

export function Header() {
  return (
    <header className="flex items-center justify-between h-24">
      <a href="/">
        <img src="/logo.png" width={"160px"} />
      </a>

      <nav className="flex items-center gap-10">
        {enlaces.map((enlace) => {
          return (
            <Link
              className="text-zinc-700 hover:text-black cursor-pointer"
              smooth
              key={enlace.nombre}
              to={enlace.url}
            >
              {enlace.nombre}
            </Link>
          );
        })}
        <ConsultaBoton />
      </nav>
    </header>
  );
}

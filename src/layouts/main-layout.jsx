import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <header className="header-principal">
        <a href="/">
          <img src="/logo.png" width={"160px"} />
        </a>
        <ul>
          <li>
            <a>Galería</a>
          </li>
          <li>
            <a>Información</a>
          </li>
          <li>
            <a>Ubicación</a>
          </li>
          <li>
            <a>Contacto</a>
          </li>
          <li>
            <a className="boton-consultar-reserva">Consultar reserva</a>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

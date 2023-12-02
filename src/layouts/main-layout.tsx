import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../components/modal";
import { obtenerReservaPorId } from "../functions/reservas";
import { useNavigate } from "react-router-dom";

export function MainLayout() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [consultando, setConsultando] = useState(false);

  const consultarReserva = async () => {
    setError("");
    setConsultando(true);
    const reserva = await obtenerReservaPorId(codigo);

    setTimeout(() => {
      setConsultando(false);
      if (reserva == null)
        return setError("No existe ninguna reserva con ese código.");
      else if (reserva && reserva.estado == false)
        return setError("Reserva inactiva.");
      else {
        setCodigo("");
        setModal(false);
        navigate("/reserva/" + codigo);
      }
    }, 1000);
  };

  return (
    <>
      <header className="header-principal">
        {modal && (
          <Modal onClose={() => setModal(false)}>
            <p>Ingresa el código de tu reserva</p>

            <label className="modal_input">
              <strong>Código: </strong>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </label>
            {<p className="modal_error">{error}</p>}
            <button className="modal_aceptar" onClick={consultarReserva}>
              {consultando ? "Consultando..." : "Buscar"}
            </button>
          </Modal>
        )}

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
            <button
              onClick={() => setModal(true)}
              className="boton-consultar-reserva"
            >
              Consultar reserva
            </button>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

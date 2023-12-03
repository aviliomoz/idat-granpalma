import { useState } from "react";
import { Modal } from "./modal";
import { ConsultaFormulario } from "./consulta-formulario";

export function ConsultaBoton() {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <ConsultaFormulario close={() => setModal(false)} />
        </Modal>
      )}
      <button
        onClick={() => setModal(true)}
        className="bg-slate-900 px-6 py-1.5 rounded-md text-white hover:bg-slate-800"
      >
        Consultar reserva
      </button>
    </>
  );
}

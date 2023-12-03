import { useState } from "react";
import { obtenerReservaPorId } from "../functions/reservas";
import { useNavigate } from "react-router-dom";

type Props = {
  close: () => void;
};

export function ConsultaFormulario({ close }: Props) {
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [consultando, setConsultando] = useState<boolean>(false);

  const consultarReserva = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        close();
        navigate("/reserva/" + codigo);
      }
    }, 1000);
  };

  return (
    <form onSubmit={consultarReserva}>
      <p className="mb-4">Ingresa el código de tu reserva</p>

      <label className="flex items-center gap-3">
        <strong>Código: </strong>
        <input
          className="border rounded-md border-slate-300 py-0.5 px-2 outline-none"
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </label>
      {<p className="text-sm text-red-600 mt-2">{error}</p>}
      <div className="flex justify-center">
        <button className="bg-slate-950 hover:bg-slate-900 text-white mt-5 w-52 py-1 rounded-md ">
          {consultando ? "Consultando..." : "Buscar"}
        </button>
      </div>
    </form>
  );
}

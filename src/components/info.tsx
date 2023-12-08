import { useState } from "react";
// import toast from "react-hot-toast";
import { crearCorreo } from "../functions/correos";

export function Info() {
  const [email, setEmail] = useState<string>("");

  return (
    <section className="mb-24">
      <h3 className="text-center mt-12 text-xl font-bold">
        Mantente informado
      </h3>
      <p className="text-center mt-4">
        Déjanos tu correo para avisarte de nuestras actividades y promociones
      </p>
      <form
        className="w-full flex justify-center mt-10 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          crearCorreo({correo: email})
        }}
      >
        <label>
          <span>Correo:</span>
          <input
            type="email"
            className="border border-slate-300 rounded-md px-3 py-1 ml-4 mr-8"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button className="bg-slate-950 hover:bg-slate-900 px-6 py-1 rounded text-white">
          Registrar correo
        </button>
      </form>
    </section>
  );
}

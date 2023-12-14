import dayjs from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");

  const login = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (password == "1234") {
      localStorage.setItem("gp-login", "1234");
      navigate("/dashboard/" + dayjs().format("YYYY-MM-DD"));
    } else {
      toast.error("Contraseña incorrecta");
    }
  };

  return (
    <>
      <section className="h-96 mb-20 flex justify-center items-center">
        <form className="flex flex-col gap-6 border border-slate-300 rounded-lg p-10 items-center">
          <h3 className="font-semibold text-xl">Inicia sesión</h3>
          <label>
            <span>Contraseña:</span>
            <input
            className="border border-slate-300 rounded-md px-3 py-1 ml-4 outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button onClick={login} className="bg-slate-900 px-16 py-1.5 rounded-md text-white hover:bg-slate-800">
            Entrar
          </button>
        </form>
      </section>
    </>
  );
}

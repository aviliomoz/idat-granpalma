import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function LoginHeader() {
  const navigate = useNavigate();

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    localStorage.removeItem("gp-login");
    navigate("/");
    toast.success("Se ha cerrado sesión");
  };

  return (
    <header className="flex items-center justify-between h-24">
      <a href="/">
        <img src="/logo.png" width={"160px"} />
      </a>

      <nav className="flex items-center gap-10">
        <button
          onClick={logout}
          className="bg-slate-900 px-6 py-1.5 rounded-md text-white hover:bg-slate-800"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}

import { useState, useEffect } from "react";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoginHeader } from "../components/login-header";
import { Footer } from "../components/footer";

import { LucideIcon, Lamp, BookMarked } from "lucide-react";
import dayjs from "dayjs";

const links: { nombre: string; url: string; icon: LucideIcon }[] = [
  {
    nombre: "Habitaciones",
    url: "/dashboard",
    icon: Lamp,
  },
  { nombre: "Reservas", url: "/reservas", icon: BookMarked },
];

export function LoginLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("gp-login")) {
      navigate("/login");
    }

    setCargando(false);
  }, []);

  if (cargando) return <></>;

  return (
    <>
      <LoginHeader />
      <div className="flex gap-3">
        <aside className="w-44">
          <h4 className="font-medium text-xs text-slate-600 my-4">MENU</h4>
          <nav className="flex flex-col gap-2">
            {links.map((link, index) => {
              return (
                <Link
                  className={`flex items-center gap-3 px-4 py-1.5 rounded-md ${
                    pathname.includes(link.url)
                      ? "text-slate-100 bg-slate-900 hover:bg-slate-800 "
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  key={index}
                  to={
                    link.url.includes("/dashboard")
                      ? "/dashboard/" + dayjs().format("YYYY-MM-DD")
                      : link.url
                  }
                >
                  <link.icon className="w-4" />
                  {link.nombre}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-h-[400px] bg-slate-200 rounded-md w-full mb-3">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

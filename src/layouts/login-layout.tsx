import { useState, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { LoginHeader } from "../components/login-header";
import { Footer } from "../components/footer";

export function LoginLayout() {
  const navigate = useNavigate();

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
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

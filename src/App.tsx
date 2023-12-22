import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MainLayout } from "./layouts/main-layout";
import { HomePage } from "./pages/home-page";
import { ResultadosPage } from "./pages/resultados-page";
import { HabitacionPage } from "./pages/habitacion-page";
import { ReservaPage } from "./pages/reserva-page";
import { CondicionesPage } from "./pages/condiciones-page";
import { LoginLayout } from "./layouts/login-layout";
import { DashboardPage } from "./pages/dashboard-page";
import { LoginPage } from "./pages/login-page";
import { ReservasPage } from "./pages/reservas-page";
import { CrearHabitacionPage } from "./pages/crear-habitacion-page";
import { EditarHabitacionPage } from "./pages/editar-habitacion-page";
import { ReservasLayout } from "./layouts/reservas-layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/habitaciones" element={<ResultadosPage />} />
            <Route path="/habitaciones/:id" element={<HabitacionPage />} />
            <Route path="/reserva/:id" element={<ReservaPage />} />
            <Route path="/condiciones" element={<CondicionesPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<LoginLayout />}>
            <Route path="/dashboard/:fecha" element={<DashboardPage />} />
            <Route
              path="/dashboard/crear-habitacion"
              element={<CrearHabitacionPage />}
            />
            <Route
              path="/dashboard/habitacion/:id"
              element={<EditarHabitacionPage />}
            />
            <Route element={<ReservasLayout />}>
              <Route path="/reservas" element={<ReservasPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;

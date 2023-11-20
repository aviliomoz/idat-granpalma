import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MainLayout } from "./layouts/main-layout";
import { HomePage } from "./pages/home-page";
import { ResultadosPage } from "./pages/resultados-page";
import { HabitacionPage } from "./pages/habitacion-page";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/habitaciones" element={<ResultadosPage />} />
            <Route path="/habitaciones/:id" element={<HabitacionPage />} />
            <Route path="/reserva/:id" element={<h1>Reserva page</h1>} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;

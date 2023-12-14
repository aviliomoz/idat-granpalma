import { Plus } from "lucide-react";
import { WidgetDatos } from "../components/widget-datos";
import { WidgetFechas } from "../components/widget-fechas";
import { Link } from "react-router-dom";
import { FiltrosHabitacion } from "../components/filtros-habitacion";
import { useFiltrosHab } from "../hooks/useFiltrosHab";
import { ListaHabitaciones } from "../components/lista-habitaciones";

export function DashboardPage() {
  const { tipo, estado, cambiarEstado, cambiarTipo } = useFiltrosHab();

  return (
    <>
      <section className="min-h-[400px] mb-3 flex">
        <div className="w-full bg-white rounded-md my-3 ml-3">
          <div className="flex items-center justify-between p-6">
            <h3 className="text-lg font-semibold">Habitaciones</h3>
            <div className="flex items-center gap-4">
              <FiltrosHabitacion
                tipo={tipo}
                estado={estado}
                cambiarEstado={cambiarEstado}
                cambiarTipo={cambiarTipo}
              />
              <Link
                to="/dashboard/crear-habitacion"
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-0.5 rounded-md text-sm"
              >
                <Plus className="w-4" />
                Nueva
              </Link>
            </div>
          </div>
          <ListaHabitaciones tipo={tipo} estado={estado} />
        </div>

        <div className="w-80 flex flex-col gap-3 p-3">
          <WidgetFechas />
          <WidgetDatos />
        </div>
      </section>
    </>
  );
}

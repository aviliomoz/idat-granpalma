import { useFiltros } from "../hooks/useFiltros";

export function Filtros() {
  const { llegada, salida, adultos, infantes } = useFiltros();

  return (
    <div className="flex items-center gap-4">
      <span className="border border-slate-300 px-4 py-0.5 rounded-md text-sm bg-white">
        Llegada: {llegada}
      </span>
      <span className="border border-slate-300 px-4 py-0.5 rounded-md text-sm bg-white">
        Salida: {salida}
      </span>
      <span className="border border-slate-300 px-4 py-0.5 rounded-md text-sm bg-white">
        Adultos: {adultos}
      </span>
      <span className="border border-slate-300 px-4 py-0.5 rounded-md text-sm bg-white">
        Niños: {infantes}
      </span>
    </div>
  );
}

import { useFiltro } from "../hooks/useFiltro";

export function Filtros() {
  const { llegada, salida, adultos, infantes } = useFiltro();

  return (
    <div className="resultados_titulo_filtros">
      <span>Llegada: {llegada}</span>
      <span>Salida: {salida}</span>
      <span>Adultos: {adultos}</span>
      <span>Niños: {infantes}</span>
    </div>
  );
}

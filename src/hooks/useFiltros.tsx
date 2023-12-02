import { useSearchParams } from "react-router-dom";
import { Filtro } from "../types";
import dayjs from "dayjs";

export const useFiltros = (): Filtro => {
  const [searchParams] = useSearchParams();

  const llegada: string =
    searchParams.get("llegada") || dayjs().format("YYYY-MM-DD");
  const salida: string =
    searchParams.get("salida") || dayjs().format("YYYY-MM-DD");
  const adultos: number = parseInt(searchParams.get("adultos")!) || 1;
  const infantes: number = parseInt(searchParams.get("infantes")!) || 0;

  return {
    llegada,
    salida,
    adultos,
    infantes,
  };
};

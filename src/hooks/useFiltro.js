import { useSearchParams } from "react-router-dom";

export const useFiltro = () => {
  const [searchParams] = useSearchParams();

  return {
    llegada: searchParams.get("llegada"),
    salida: searchParams.get("salida"),
    adultos: parseInt(searchParams.get("adultos")),
    infantes: parseInt(searchParams.get("infantes")),
  };
};

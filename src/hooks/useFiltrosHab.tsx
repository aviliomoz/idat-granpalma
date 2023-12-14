import { useState } from "react";

export function useFiltrosHab() {
  const [tipo, setTipo] = useState<string>(
    localStorage.getItem("gp-filtro-tipo") || "Todas"
  );
  const [estado, setEstado] = useState<string>(
    localStorage.getItem("gp-filtro-estado") || "Todas"
  );

  const cambiarTipo = (nuevo_tipo: string) => {
    localStorage.setItem("gp-filtro-tipo", nuevo_tipo);
    setTipo(nuevo_tipo);
  };

  const cambiarEstado = (nuevo_estado: string) => {
    localStorage.setItem("gp-filtro-estado", nuevo_estado);
    setEstado(nuevo_estado);
  };

  return { tipo, estado, cambiarTipo, cambiarEstado };
}

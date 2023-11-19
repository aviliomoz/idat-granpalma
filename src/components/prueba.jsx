import { useEffect, useState } from "react";

export function Prueba() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character").then((data) =>
      data.json().then((result) => setClientes(result.results))
    );
  }, []);

  return (
    <div>
      {clientes.map((cliente) => (
        <p key={cliente.id}>{cliente.name}</p>
      ))}
    </div>
  );
}

const url = "http://localhost:9797/clientes/";

export const optenerClientes = async () => {
  const res = await fetch(url, {mode: "no-cors"});
  const data = await res.json();

  return data;
};

export const obtenerClientePorId = async (id) => {
  const res = await fetch(url + id, {mode: "no-cors"});
  const data = await res.json();

  return data;
};

export const obtenerClientePorDni = async (dni) => {
  const res = await fetch(url, {mode: "no-cors"});
  const data = await res.json();

  return data.find((cliente) => cliente.dni == dni) || null;
};

export const crearCliente = async (datos_cliente) => {
  const cliente = await obtenerClientePorDni(datos_cliente.dni);

  if (cliente) {
    return cliente;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos_cliente),
    mode: "no-cors"
  });

  const data = await res.json();

  return data;
};

export const actualizarCliente = async (id, cliente) => {
  const res = await fetch(url + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
    mode: "no-cors"
  });

  const data = await res.json();

  return data;
};

export const desactivarCliente = async (id) => {
  const cliente = await obtenerClientePorId(id);

  const res = await fetch(url + cliente.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...cliente, estado: false }),
    mode: "no-cors"
  });

  const data = await res.json();

  return data;
};

export const activarCliente = async (id) => {
  const cliente = await obtenerClientePorId(id);

  const res = await fetch(url + cliente.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...cliente, estado: true }),
    mode: "no-cors"
  });

  const data = await res.json();

  return data;
};

// import toast from "react-hot-toast";
import { Cliente } from "../types";

const url = "http://localhost:9797/clientes";

export const obtenerClientes = async () => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();

    const data: Cliente[] = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al obtener los clientes");
    return [];
  }
};

export const obtenerClientePorId = async (id: number) => {
  try {
    const res = await fetch(`${url}/${id}`);
    if (!res.ok) throw new Error();

    const data: Cliente = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al obtener el cliente");
    return null;
  }
};

export const obtenerClientePorDni = async (dni: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();

    const data: Cliente[] = await res.json();

    const cliente = data.find((cliente: Cliente) => cliente.dni == dni);
    if (!cliente) throw new Error();

    return cliente;
  } catch (error) {
    // toast.error("Error al obtener el cliente");
    return null;
  }
};

export const crearCliente = async (datos_cliente: Omit<Cliente, "id">) => {
  try {
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
    });

    if (!res.ok) throw new Error();

    const data: Cliente = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al crear el cliente");
    return null;
  }
};

export const actualizarCliente = async (cliente: Cliente) => {
  try {
    const res = await fetch(`${url}/${cliente.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });

    if (!res.ok) throw new Error();

    const data: Cliente = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al actualizar el cliente");
    return null;
  }
};

export const desactivarCliente = async (id: number) => {
  try {
    const cliente = await obtenerClientePorId(id);

    if (!cliente) throw new Error();

    const res = await fetch(`${url}/${cliente.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...cliente, estado: false }),
    });

    const data: Cliente = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al desactivar el cliente");
    return null;
  }
};

export const activarCliente = async (id: number) => {
  try {
    const cliente = await obtenerClientePorId(id);

    if (!cliente) throw new Error();

    const res = await fetch(`${url}/${cliente.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...cliente, estado: true }),
    });

    const data: Cliente = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al activar el cliente");
    return null;
  }
};

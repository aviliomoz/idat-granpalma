import { Correo } from "../types";

const url = "http://localhost:9797/correos";

export const crearCorreo = async (datos_correo: Omit<Correo, "id">) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos_correo),
    });

    if (!res.ok) throw new Error();

    const data: Correo = await res.json();

    return data;
  } catch (error) {
    // toast.error("Error al crear el cliente");
    return null;
  }
};

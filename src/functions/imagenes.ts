import toast from "react-hot-toast";
import { Imagen } from "../types";

const url = "http://localhost:9797/imagenes";

export const obtenerImagenesPorHabitacion = async (habitacion_id: number) => {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error();

    const data: Imagen[] = await res.json();

    return data.filter((imagen) => imagen.habitacion_id == habitacion_id);
  } catch (error) {
    toast.error("Error al obtener las imágenes");
    return [];
  }
};

export const obtenerImagenPorId = async (id: number) => {
  try {
    const res = await fetch(`${url}/${id}`);

    if (!res.ok) throw new Error();

    const data: Imagen = await res.json();

    return data;
  } catch (error) {
    toast.error("Error al obtener la imagen");
    return null;
  }
};

export const crearImagen = async (imagen: Omit<Imagen, "id">) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(imagen),
    });

    if (!res.ok) throw new Error();

    const data: Imagen = await res.json();

    return data;
  } catch (error) {
    toast.error("Error al crear la imagen");
    return null;
  }
};

export const actualizarImagen = async (imagen: Imagen) => {
  try {
    const res = await fetch(`${url}/${imagen.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(imagen),
    });

    if (!res.ok) throw new Error();

    const data: Imagen = await res.json();

    return data;
  } catch (error) {
    toast.error("Error al actualizar la imagen");
    return null;
  }
};

export const eliminarImagen = async (id: number) => {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error();

    const data: Imagen = await res.json();

    return data;
  } catch (error) {
    toast.error("Error al eliminar la imagen");
    return null;
  }
};

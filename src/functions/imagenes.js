const url = "http://localhost:9797/imagenes/";

export const obtenerImagenesPorHabitacion = async (habitacion_id) => {
  const res = await fetch(url, {mode: "no-cors"});
  const data = await res.json();

  return data.filter((imagen) => imagen.habitacion_id == habitacion_id);
};

export const obtenerImagenPorId = async (id) => {
  const res = await fetch(url + id, {mode: "no-cors"});
  const data = await res.json();

  return data;
};

export const crearImagen = async (imagen) => {
  const res = await fetch(url + id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imagen),
    mode: "no-cors"
  });

  const data = await res.json();

  return data;
};

export const actualizarImagen = async (id, imagen) => {
  const res = await fetch(url + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imagen),
    mode: "no-cors"
  });

  const data = await res.json();

  return data;
};

export const eliminarImagen = async (id) => {
  const res = await fetch(url + id, {
    method: "DELETE",
    mode: "no-cors"
  });

  const data = await res.json();

  return data;
};

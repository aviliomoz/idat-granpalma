const url = "http://localhost:9797/imagenes/";

export const obtenerImagenesPorHabitacion = async (habitacion_id) => {
  const res = await fetch(url, {});
  const data = await res.json();

  return data.filter((imagen) => imagen.habitacion_id == habitacion_id);
};

export const obtenerImagenPorId = async (id) => {
  const res = await fetch(url + id, {});
  const data = await res.json();

  return data;
};

export const crearImagen = async (imagen) => {
  const res = await fetch(url + id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imagen),
    
  });

  const data = await res.json();

  return data;
};

export const actualizarImagen = async (id, imagen) => {
  const res = await fetch(url + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imagen),
    
  });

  const data = await res.json();

  return data;
};

export const eliminarImagen = async (id) => {
  const res = await fetch(url + id, {
    method: "DELETE",
    
  });

  const data = await res.json();

  return data;
};

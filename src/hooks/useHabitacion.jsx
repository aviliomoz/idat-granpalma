import { useEffect, useState } from "react";

export const useHabitacion = (habitacion) => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9797/rest_imagen").then((res) =>
      res
        .json()
        .then((imagenes) =>
          setImagenes(
            imagenes.filter(
              (imagen) => imagen.habitacion === habitacion.id_habitaciones
            )
          )
        )
    );
  }, []);

  return {
    habitacion: {
      ...habitacion,
      imagenes,
    },
  };
};

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const useHabitaciones = ({ llegada, salida, huespedes }) => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9797/rest_hab").then((res) =>
      res.json().then((habitaciones) => setHabitaciones(habitaciones))
    );
  }, []);

  useEffect(() => {
    fetch("http://localhost:9797/rest_res").then((res) =>
      res
        .json()
        .then((reservas) =>
          setReservas(reservas.filter((reserva) => reserva.estado === true))
        )
    );
  }, []);

  const obtenerResultados = () => {
    let resultados = [];

    habitaciones.map((habitacion) => {
      let disponible = true;

      reservas.map((reserva) => {
        if (reserva.habitacion_id === habitacion.id) {
          if (reserva.capacidad < huespedes) {
            disponible = false;
          }

          const b_llegada = dayjs(llegada, "YYYY-MM-DD");
          const r_llegada = dayjs(reserva.llegada, "YYYY-MM-DD");
          const r_salida = dayjs(reserva.salida, "YYYY-MM-DD");

          if (b_llegada >= r_llegada && b_llegada <= r_salida) {
            disponible = false;
          }
        }
      });

      if (disponible) resultados.push(habitacion);
    });

    return resultados;
  };

  return { habitaciones: obtenerResultados() };
};

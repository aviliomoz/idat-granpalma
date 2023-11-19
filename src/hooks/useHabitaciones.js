import { useEffect, useState } from "react";

export const useHabitaciones = ({ llegada, salida, huespedes }) => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetch("").then((res) =>
      res.json().then((habitaciones) => setHabitaciones(habitaciones))
    );
  }, []);

  useEffect(() => {
    fetch("").then((res) =>
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
        }
      });

      if (disponible) resultados.push(habitacion);
    });

    return resultados;
  };

  return { habitaciones: obtenerResultados() };
};

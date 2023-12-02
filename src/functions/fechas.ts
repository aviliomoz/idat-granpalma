import dayjs from "dayjs";

export const obtenerFecha = (
  fecha = dayjs().format("YYYY-MM-DD"),
  suma = 0
): string => {
  return dayjs(fecha, "YYYY-MM-DD").add(suma, "days").format("YYYY-MM-DD");
};

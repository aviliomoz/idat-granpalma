import dayjs from "dayjs";
import es from "dayjs/locale/es";
import { useNavigate, useParams } from "react-router-dom";

export function useFecha() {
  const navigate = useNavigate();
  const { fecha } = useParams();

  dayjs.locale(es);

  const addFecha = () => {
    navigate(
      `/dashboard/${dayjs(fecha, "YYYY-MM-DD")
        .add(1, "day")
        .format("YYYY-MM-DD")}`
    );
  };

  const sustractFecha = () => {
    navigate(
      `/dashboard/${dayjs(fecha, "YYYY-MM-DD")
        .add(-1, "day")
        .format("YYYY-MM-DD")}`
    );
  };

  return { fecha: dayjs(fecha, "YYYY-MM-DD"), addFecha, sustractFecha };
}

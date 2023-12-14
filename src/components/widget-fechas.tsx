import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFecha } from "../hooks/useFecha";

export function WidgetFechas() {
  const { fecha, addFecha, sustractFecha } = useFecha();

  const toCamelCase = (text: string) => {
    return text.split("")[0].toUpperCase() + text.slice(1);
  };

  return (
    <div className="p-4 bg-white rounded-md flex gap-6 items-center min-w-max">
      <button onClick={() => sustractFecha()}>
        <ChevronLeft />
      </button>
      <div className="w-full flex flex-col gap-2 items-center">
        <p className="text-xs font-medium">
          {toCamelCase(fecha.format("MMMM - YYYY"))}
        </p>
        <p>{toCamelCase(fecha.format("dddd DD"))}</p>
      </div>
      <button onClick={() => addFecha()}>
        <ChevronRight />
      </button>
    </div>
  );
}

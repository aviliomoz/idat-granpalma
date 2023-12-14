type Props = {
  tipo: string;
  estado: string;
  cambiarTipo: (tipo: string) => void;
  cambiarEstado: (estado: string) => void;
};

export function FiltrosHabitacion({
  tipo,
  estado,
  cambiarEstado,
  cambiarTipo,
}: Props) {
  return (
    <form className="flex items-center justify-end gap-3 text-sm">
      <label className="flex items-center gap-2">
        <span>Tipo:</span>
        <select
          className="border rounded-md py-0.5 px-2"
          defaultValue={tipo}
          onChange={(e) => cambiarTipo(e.target.value)}
        >
          <option value={"Todas"}>Todas</option>
          <option value={"Habitación Simple"}>Habitación Simple</option>
          <option value={"Habitación Doble Simple"}>
            Habitación Doble Simple
          </option>
          <option value={"Habitación Doble Matrimonial"}>
            Habitación Doble Matrimonial
          </option>
          <option value={"Habitación Familiar"}>Habitación Familiar</option>
        </select>
      </label>
      <label className="flex items-center gap-2">
        <span>Estado:</span>
        <select
          className="border rounded-md py-0.5 px-2"
          defaultValue={estado}
          onChange={(e) => cambiarEstado(e.target.value)}
        >
          <option value={"Todas"}>Todas</option>
          <option value={"Activas"}>Activas</option>
          <option value={"Inactivas"}>Inactivas</option>
        </select>
      </label>
    </form>
  );
}

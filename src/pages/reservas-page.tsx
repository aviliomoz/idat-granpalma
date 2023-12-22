import { useEffect, useState } from "react";
import { obtenerFecha } from "../functions/fechas";
import toast from "react-hot-toast";
import { Habitacion, Reserva } from "../types";
import { obtenerHabitacionesDisponibles } from "../functions/habitaciones";
import { crearCliente } from "../functions/clientes";
import { crearReserva } from "../functions/reservas";

export function ReservasPage() {
  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [habitacion, setHabitacion] = useState<number>(1);
  const [fechaLlegada, setFechaLlegada] = useState(obtenerFecha());
  const [fechaSalida, setFechaSalida] = useState(obtenerFecha());
  const [cantidadAdultos, setCantidadAdultos] = useState(1);
  const [cantidadInfantes, setCantidadInfantes] = useState(0);

  const [cargando, setCargando] = useState<boolean>(false);

  useEffect(() => {
    if (fechaSalida <= fechaLlegada) {
      setFechaSalida(obtenerFecha(fechaLlegada, 1));
    }
  }, [fechaLlegada]);

  useEffect(() => {
    obtenerHabitacionesDisponibles({
      llegada: fechaLlegada,
      salida: fechaSalida,
      adultos: cantidadAdultos,
      infantes: cantidadInfantes,
    })
      .then(setHabitaciones)
      .then(() => setHabitacion(habitaciones[0].id));
  }, [fechaLlegada, fechaSalida, cantidadAdultos, cantidadInfantes]);

  if (!habitaciones) return <></>;

  const registrar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCargando(true);

    try {
      const cliente = await crearCliente({
        dni,
        nombres,
        apellidos,
        telefono,
        email,
      });

      if (!cliente) throw new Error();

      const datos_reserva: Omit<Reserva, "id"> = {
        cliente_id: cliente.id,
        habitacion_id: habitacion,
        fecha_llegada: fechaLlegada,
        fecha_salida: fechaSalida,
        huespedes: cantidadAdultos + cantidadInfantes,
        estado: true,
      };

      crearReserva(datos_reserva).then((data) => {
        setCargando(false);
        if (data) {
          toast.success("Reserva generada exitosamente");
          window.location.reload();
        } else {
          throw new Error();
        }
      });
    } catch (error) {
      toast.error("Error al registrar la reserva");
    }
  };

  return (
    <form
      onSubmit={registrar}
      className="flex flex-col gap-2 bg-white p-6 text-sm rounded-md"
    >
      <h3 className="text-base font-semibold mb-4">Registrar reserva</h3>
      <label>
        <span className="font-semibold mr-2">DNI:</span>
        <input
          className="border px-3 py-0.5 rounded-md"
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
      </label>
      <label>
        <span className="font-semibold mr-2">Nombres:</span>
        <input
          className="border px-3 py-0.5 rounded-md"
          type="text"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
        />
      </label>
      <label>
        <span className="font-semibold mr-2">Apellidos:</span>
        <input
          className="border px-3 py-0.5 rounded-md"
          type="text"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
      </label>
      <label>
        <span className="font-semibold mr-2">Teléfono:</span>
        <input
          className="border px-3 py-0.5 rounded-md"
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </label>
      <label>
        <span className="font-semibold mr-2">Email:</span>
        <input
          className="border px-3 py-0.5 rounded-md"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        <span className="font-semibold">Llegada:</span>
        <input
          className="border-slate-200 border px-3 py-1 rounded-md ml-3 w-36"
          type="date"
          value={fechaLlegada}
          min={obtenerFecha()}
          onChange={(e) => setFechaLlegada(e.target.value)}
        />
      </label>
      <label>
        <span className="font-semibold">Salida:</span>
        <input
          className="border-slate-200 border px-3 py-1 rounded-md ml-3 w-36"
          type="date"
          value={fechaSalida}
          min={obtenerFecha(fechaLlegada, 1)}
          onChange={(e) => setFechaSalida(e.target.value)}
        />
      </label>
      <label>
        <span className="font-semibold">Adultos:</span>
        <input
          className="border-slate-200 border px-3 py-1 rounded-md ml-3 w-16"
          type="number"
          min={1}
          value={cantidadAdultos}
          onChange={(e) => {
            if (parseInt(e.target.value) < 1) {
              setCantidadAdultos(1);
            } else {
              setCantidadAdultos(parseInt(e.target.value));
            }
          }}
        />
      </label>
      <label>
        <span className="font-semibold">Niños:</span>
        <input
          className="border-slate-200 border px-3 py-1 rounded-md ml-3 w-16"
          type="number"
          min={0}
          value={cantidadInfantes}
          onChange={(e) => setCantidadInfantes(parseInt(e.target.value))}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-semibold mr-2">Habitación:</span>
        <select
          className="border rounded-md py-0.5 px-2"
          defaultValue={habitacion}
          onChange={(e) => setHabitacion(parseInt(e.target.value))}
        >
          {habitaciones.map((habitacion) => {
            return (
              <option key={habitacion.id} value={habitacion.id}>{`Habitación ${
                habitacion.id
              } (${habitacion.nombre.replace("Habitación ", "")})`}</option>
            );
          })}
        </select>
      </label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-1 rounded-md mt-4"
        >
          {cargando ? "Registrando.." : "Registrar"}
        </button>
      </div>
    </form>
  );
}

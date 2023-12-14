import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearHabitacion } from "../functions/habitaciones";
import { crearImagen } from "../functions/imagenes";
import toast from "react-hot-toast";

export function CrearHabitacionPage() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState<string>("Habitación Simple");
  const [precio, setPrecio] = useState<number>(0);
  const [huespedes, setHuespedes] = useState<number>(1);
  const [imagen, setImagen] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const habitacion = await crearHabitacion({
      nombre: tipo,
      descripcion: descripcion,
      precio: precio,
      capacidad: huespedes,
      estado: true,
    });

    if (habitacion) {
      const imagenes = await crearImagen({
        habitacion_id: habitacion.id,
        url: imagen,
      });

      if (imagenes) {
        navigate(-1);
        toast.success("Habitación creada");
      }
    }
  };

  return (
    <>
      <section className="bg-white m-3 rounded-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Crear habitación</h3>
          <button onClick={() => navigate(-1)}>Cancelar</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col py-4">
          <div className="flex gap-16">
            <div className="flex flex-col w-2/5 gap-2">
              <h4 className="font-medium mb-3">Datos de la habitación</h4>
              <label>
                <span>Tipo:</span>
                <select
                  className="border rounded-md py-0.5 px-2 ml-3"
                  defaultValue={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value={"Habitación Simple"}>Habitación Simple</option>
                  <option value={"Habitación Doble Simple"}>
                    Habitación Doble Simple
                  </option>
                  <option value={"Habitación Doble Matrimonial"}>
                    Habitación Doble Matrimonial
                  </option>
                  <option value={"Habitación Familiar"}>
                    Habitación Familiar
                  </option>
                </select>
              </label>
              <label>
                <span>Precio por noche: S/</span>
                <input
                className="border rounded-md py-0.5 px-2 ml-3 w-16"
                  type="number"
                  min={0}
                  value={precio}
                  onChange={(e) => setPrecio(parseFloat(e.target.value))}
                ></input>
              </label>
              <label>
                <span>Huéspedes máximos:</span>
                <input
                className="border rounded-md py-0.5 px-2 ml-3 w-16"
                  type="number"
                  min={1}
                  value={huespedes}
                  onChange={(e) => setHuespedes(parseFloat(e.target.value))}
                ></input>
              </label>
              <label className="flex flex-col gap-2">
                <span>Descripción:</span>
                <textarea
                className="border rounded-md py-0.5 px-2 resize-none h-24"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col w-1/2 gap-4">
              <label className="flex">
                <span>Imagen:</span>
                <input
                className="border rounded-md py-0.5 px-2 ml-2 w-full"
                  type="text"
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                />
              </label>
              <img className="bg-slate-100 rounded-md overflow-hidden h-48 w-80" src={imagen} />
            </div>
          </div>
          <div className="h-12 flex justify-end items-center">
            <button className="bg-slate-900 hover:bg-slate-800 px-8 py-2 text-white rounded-md text-sm" type="submit">Guardar habitación</button>
          </div>
        </form>
      </section>
    </>
  );
}

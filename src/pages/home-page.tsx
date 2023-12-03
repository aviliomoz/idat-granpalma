import { BarraBusqueda } from "../components/barra-busqueda";
import { Galeria } from "../components/galeria";
import { Info } from "../components/info";
import { Mapa } from "../components/mapa";

export function HomePage() {
  return (
    <>
      <section className="relative flex items-center justify-center">
        <img className="w-full rounded-md h-96" src="/fondo.jpg" />
        <div className="absolute flex flex-col gap-8 items-center text-center">
          <h2 className="max-w-xl text-white text-4xl font-medium">
            El mejor hotel para disfrutar tus vacaciones en la playa
          </h2>
          <BarraBusqueda />
        </div>
      </section>
      <Galeria />
      <Mapa />
      <Info />
    </>
  );
}

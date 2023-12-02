import { BarraBusqueda } from "../components/barra-busqueda";

export function HomePage() {
  return (
    <>
      <img
        className="imagen-fondo"
        src="/fondo.jpg"
        width={"100%"}
        height={"500px"}
      />
      <section className="seccion-busqueda">
        <h2>El mejor hotel para disfrutar tus vacaciones en la playa</h2>
        <BarraBusqueda />
      </section>
    </>
  );
}

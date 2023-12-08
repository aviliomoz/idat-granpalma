import { Link } from "react-router-dom";
import { Element } from "react-scroll";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <Element name="contacto">
      <footer className="bg-slate-900 text-white p-8 mb-10 rounded-md">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Información de contacto */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Información de Contacto
            </h2>
            <p>Teléfono: +51 945687158</p>
            <p>Email: granpalma@gmail.com</p>
          </div>

          {/* Enlaces de interés */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Redes sociales</h2>
            <div className="flex items-center gap-4 justify-center">
              <Facebook />
              <Instagram />
              <Twitter />
              <Youtube />
            </div>
          </div>

          {/* Libro de reclamaciones, redes sociales, inicio de sesión */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Otras Secciones</h2>
            <p>
              <a href="#">Libro de Reclamaciones</a>
            </p>
            <p>
              <Link to="/login">Iniciar Sesión</Link>
            </p>
          </div>
        </div>

        {/* Políticas de servicio */}
        <div className="mt-12 text-center">
          <p>
            <Link to={"/condiciones"}>Políticas de Servicio</Link> - © 2023
            Hotel Gran Palma
          </p>
        </div>
      </footer>
    </Element>
  );
}

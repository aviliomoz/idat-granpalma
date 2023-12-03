import { Element } from "react-scroll";

export function Mapa() {
  return (
    <Element name="ubicacion">
      <section>
        <h3 className="text-center mt-12 text-xl font-bold">
          Ven a visitarnos
        </h3>
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15893.891029122766!2d-80.62158014999999!3d-5.188112599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904a1064514f822f%3A0xfe74acc38526eb3e!2sHotel%20Gran%20Palma%20Piura!5e0!3m2!1ses!2spe!4v1701574726634!5m2!1ses!2spe"
          width="800"
          height="600"
          loading="lazy"
          className="w-full p-14"
        ></iframe> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15918.338288986244!2d-81.0659685667931!3d-4.104604381096646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spe!4v1701584833365!5m2!1ses!2spe"
          width="800"
          height="600"
          loading="lazy"
          className="w-full p-14"
        ></iframe>
      </section>
    </Element>
  );
}

import { useState } from "react";
import { Modal } from "./modal";
import { Element } from "react-scroll";

const imagenes: { src: string }[] = [
  { src: "https://www.eluniversal.com.mx/resizer/pAcZ4pKhVCS9ncmDXERDsqrXGQs=/1100x666/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/SENJGS64ZNC6BHWRLOEVJ3NU6E.jpg" },
  { src: "https://portal.andina.pe/EDPfotografia2/Thumbnail/2011/11/05/000169081W.jpg" },
  { src: "https://www.revistaequipar.com/admin/img/noticias/Hilton-abrir%C3%A1-hotel-de-60-habitaciones-en-Playa-del-Carmen.jpg" },
  { src: "https://images.mirai.com/INFOROOMS/97192124/G1Pgf1HwH1WguHDRIAu9/G1Pgf1HwH1WguHDRIAu9_large.jpg" },
  { src: "https://images.trvl-media.com/lodging/1000000/430000/425200/425179/6e5293cb.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium" },
  { src: "https://img.100r.systems/img/5f69222ac43c9a364ed07cd5b8fd891a.jpg" },
];

export function Galeria() {
  const [modal, setModal] = useState<string>();

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(undefined)}>
          <img src={modal} className="w-[700px] rounded-md" />
        </Modal>
      )}
      <Element name="galeria">
        <section>
          <h3 className="text-center mt-12 mb-4 text-xl font-bold">
            Nuestros ambientes y actividades
          </h3>
          <div className="w-full grid grid-cols-3 gap-10 p-6">
            {imagenes.map((imagen, index) => {
              return (
                <img
                  key={index}
                  src={imagen.src}
                  className="w-full rounded-md cursor-pointer"
                  onClick={() => {
                    setModal(imagen.src);
                  }}
                />
              );
            })}
          </div>
        </section>
      </Element>
    </>
  );
}

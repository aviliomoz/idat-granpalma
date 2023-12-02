import "../styles/components/modal.css";

import { X } from "lucide-react";

type Props = {
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
};

export function Modal({ children, onClose }: Props) {
  return (
    <section className="modal_background">
      <div className="modal_contenido">
        <button
          className="modal_cerrar"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X />
        </button>
        {children}
      </div>
    </section>
  );
}

import { X } from "lucide-react";

type Props = {
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
};

export function Modal({ children, onClose }: Props) {
  return (
    <section className="fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-slate-900 bg-opacity-10 z-40">
      <div className="bg-white p-10 rounded-md relative pt-12">
        <button
          className="absolute top-4 right-4"
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

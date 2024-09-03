//Aqui vendra toda la logica de desarrollo del multiStep form
import { useState } from "react";
import Parte1 from "./parte1";
import Parte2 from "./parte2";
import Parte3 from "./parte3";

const ManageCrearEmpleado = () => {
  const [paginaActual, setPaginaActual] = useState<number>(0);

  if (paginaActual > 2) {
    setPaginaActual(0);
  }

  if (paginaActual === 0) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Parte1 setPaginaActual={setPaginaActual} />
      </div>
    );
  }
  if (paginaActual === 1) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Parte2 setPaginaActual={setPaginaActual} />
      </div>
    );
  }
  if (paginaActual === 2) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Parte3 setPaginaActual={setPaginaActual} />
      </div>
    );
  }
};

export default ManageCrearEmpleado;

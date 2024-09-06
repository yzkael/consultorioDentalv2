//Aqui vendra toda la logica de desarrollo del multiStep form
import { useState } from "react";
import Parte1 from "./Parte1";
import Parte2 from "./Parte2";
import Parte3 from "./Parte3";
import FormCreateTopTitle from "../../components/FormCreateTopTitle";

const ManageCrearEmpleado = () => {
  const [paginaActual, setPaginaActual] = useState<number>(0);

  if (paginaActual > 2) {
    setPaginaActual(0);
  }

  if (paginaActual === 0) {
    return (
      <div className="h-screen w-full flex flex-col justify-center pt-10 items-center gap-10 max-h-screen">
        <FormCreateTopTitle />
        <Parte1 setPaginaActual={setPaginaActual} />
      </div>
    );
  }
  if (paginaActual === 1) {
    return (
      <div className="h-screen w-full flex flex-col justify-center pt-10 items-center gap-10 max-h-screen">
        <FormCreateTopTitle />
        <Parte2 setPaginaActual={setPaginaActual} />
      </div>
    );
  }
  if (paginaActual === 2) {
    return (
      <div className="h-screen w-full flex flex-col justify-center pt-10 items-center gap-10 max-h-screen">
        <FormCreateTopTitle />
        <Parte3 setPaginaActual={setPaginaActual} />
      </div>
    );
  }
};

export default ManageCrearEmpleado;

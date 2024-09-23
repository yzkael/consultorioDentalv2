import { useState } from "react";
import { CrearDentistaFormType } from "../../types/app-types";
import { FormProvider, useForm } from "react-hook-form";
import InformacionDentista from "./InformacionDentista";
import InformacionDentista2 from "./InformacionDentista2";
import DatosUsuarioDentista from "./DatosUsuarioDentista";
import TitleMenus from "../../components/TitleMenus";

type DentistaFormProps = {
  onSave: (dentistaFormData: CrearDentistaFormType) => void;
};
//Its lit
const ManageDentistaForm = ({ onSave }: DentistaFormProps) => {
  const formMethods = useForm<CrearDentistaFormType>();
  const [paginaActual, setPaginaActual] = useState(0);
  const { handleSubmit } = formMethods;


  const handleBack = () => {
    setPaginaActual((prev) => prev - 1);
  }


  const onSubmit = handleSubmit((data: CrearDentistaFormType) => {
    if (paginaActual != 2) {
      setPaginaActual(paginaActual + 1);
    } else {
      onSave(data);
    }
  });
  return (
    <div className="w-full h-screen">
      <TitleMenus title={"Crear Dentista"} />
      <FormProvider {...formMethods}>
        <form className="w-[60vw] h-[60vh] bg-slate-400" onSubmit={onSubmit}>
          {paginaActual == 0 && <InformacionDentista />}
          {paginaActual == 1 && <InformacionDentista2 handleBack={handleBack} />}
          {paginaActual == 2 && <DatosUsuarioDentista handleBack={handleBack} />}
        </form>
      </FormProvider>
    </div>
  );
};

export default ManageDentistaForm;

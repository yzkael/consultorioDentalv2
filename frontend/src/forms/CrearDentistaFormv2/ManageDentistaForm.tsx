import { useState } from "react";
import { CrearDentistaFormType } from "../../types/app-types";
import { FormProvider, useForm } from "react-hook-form";
import InformacionDentista from "./InformacionDentista";
import InformacionDentista2 from "./InformacionDentista2";
import DatosUsuarioDentista from "./DatosUsuarioDentista";

type DentistaFormProps = {
  onSave: (dentistaFormData: CrearDentistaFormType) => void;
  isLoading: boolean;
};
//Its lit
const ManageDentistaForm = ({ onSave, isLoading }: DentistaFormProps) => {
  const formMethods = useForm<CrearDentistaFormType>();
  const [paginaActual, setPaginaActual] = useState(0);
  const { handleSubmit } = formMethods;


  // ------ POSIBLE SOLUCION-----------
  const handleNext = () => {
    console.log(paginaActual);
    setPaginaActual(paginaActual + 1)
  }


  // -----------------------------------


  const onSubmit = handleSubmit((data: CrearDentistaFormType) => {
    if (paginaActual != 2) {
      setPaginaActual(paginaActual + 1);
    } else {
      onSave(data);
    }
  });
  return (
    <div className="w-full h-screen">
      <FormProvider {...formMethods}>
        <form className="w-[60vw] h-[60vh] bg-slate-400" onSubmit={onSubmit}>
          {paginaActual == 0 && <InformacionDentista />}
          {paginaActual == 1 && <InformacionDentista2 />}
          {paginaActual == 2 && <DatosUsuarioDentista />}
          <div className="flex gap-4">
            {/* Navigation buttons */}
            {paginaActual > 0 && (
              <button
                type="button"
                onClick={() => setPaginaActual(paginaActual - 1)}
                className="btn btn-secondary"
              >
                Back
              </button>
            )}
            {/* <button
              type="submit"
              className="py-4 px-2 bg-slate-500 disabled:bg-slate-800"
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : paginaActual === 2
                  ? "Submit"
                  : "Next"}
            </button> */}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ManageDentistaForm;

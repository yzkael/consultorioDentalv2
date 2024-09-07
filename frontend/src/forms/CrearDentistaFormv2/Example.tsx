import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import FormCreateTopTitle from "../../components/FormCreateTopTitle";

// Define your form data structure based on CrearDentistaFormType
export type CrearDentistaFormType = {
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  correo: string;
  carnet: string;
  telefono: string;
  fechaNacimiento: Date;
  username: string;
  password: string;
  especalidad: number;
};

const ManageCrearEmpleado = () => {
  const [paginaActual, setPaginaActual] = useState<number>(0);

  // Initialize the form with react-hook-form and typing for form data
  const methods = useForm<CrearDentistaFormType>({
    defaultValues: {
      nombre: "",
      apPaterno: "",
      apMaterno: "",
      correo: "",
      carnet: "",
      telefono: "",
      fechaNacimiento: new Date(),
      username: "",
      password: "",
      especalidad: 1,
    },
  });

  const onSubmit: SubmitHandler<CrearDentistaFormType> = (data) => {
    if (paginaActual < 2) {
      setPaginaActual(paginaActual + 1);
    } else {
      // Submit form data when all steps are complete
      console.log("Form data:", data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="h-screen w-full flex flex-col justify-center pt-10 items-center gap-10 max-h-screen"
      >
        <FormCreateTopTitle />

        {/* Conditionally render the current step
        {paginaActual === 0 && <Parte1 setPaginaActual={setPaginaActual} />}
        {paginaActual === 1 && <Parte2 setPaginaActual={setPaginaActual} />}
        {paginaActual === 2 && <Parte3 setPaginaActual={setPaginaActual} />} */}

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
          <button type="submit" className="btn btn-primary">
            {paginaActual === 2 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageCrearEmpleado;

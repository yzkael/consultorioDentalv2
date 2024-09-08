import { useFormContext } from "react-hook-form";
import { CrearDentistaFormType } from "../../types/app-types";

const InformacionDentista2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CrearDentistaFormType>();

  return (
    <div className="flex flex-col gap-4">
      <div className=" bg-slate-500 flex justify-center items-center h-5">
        Informacion Personal:
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Correo:
        <input
          type="text"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("correo", { required: "Este campo es necesario" })}
        />
        {errors.correo && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.correo.message}
            </span>
          </div>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Telefono:
        <input
          type="text"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("telefono", { required: "Este campo es necesario" })}
        />
        {errors.telefono && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.telefono.message}
            </span>
          </div>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Fecha de Nacimiento
        <input
          type="date"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("fechaNacimiento", {
            required: "Este campo es necesario",
          })}
        />
        {errors.fechaNacimiento && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.fechaNacimiento.message}
            </span>
          </div>
        )}
      </label>
    </div>
  );
};

export default InformacionDentista2;

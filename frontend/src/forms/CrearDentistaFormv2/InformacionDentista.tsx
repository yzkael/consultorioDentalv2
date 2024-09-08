import { useFormContext } from "react-hook-form";
import { CrearDentistaFormType } from "./Example";

const InformacionDentista = () => {
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
        Nombre:
        <input
          type="text"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("nombre", { required: "Este campo es necesario" })}
        />
        {errors.nombre && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.nombre.message}
            </span>
          </div>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Apellido Paterno:
        <input
          type="text"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("apPaterno", { required: "Este campo es necesario" })}
        />
        {errors.apPaterno && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.apPaterno.message}
            </span>
          </div>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Apellido Materno:
        <input
          type="text"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("apMaterno", { required: "Este campo es necesario" })}
        />
        {errors.apMaterno && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.apMaterno.message}
            </span>
          </div>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Carnet:
        <input
          type="text"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("carnet", { required: "Este campo es necesario" })}
        />
        {errors.carnet && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.carnet.message}
            </span>
          </div>
        )}
      </label>
    </div>
  );
};

export default InformacionDentista;

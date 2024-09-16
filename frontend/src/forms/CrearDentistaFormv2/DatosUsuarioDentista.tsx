import { useFormContext } from "react-hook-form";
import { CrearDentistaFormType } from "../../types/app-types";
import { especialidadesOptions } from "../../config/config-files";

const DatosUsuarioDentista = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<CrearDentistaFormType>();
  return (
    <div className="flex flex-col gap-4">
      <div className=" bg-slate-500 flex justify-center items-center h-5">
        Informacion de Usuario:
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Username:
        <input
          type="text"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("username", { required: "Este campo es necesario" })}
        />
        {errors.username && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.username.message}
            </span>
          </div>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Password:
        <input
          type="password"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("password", { required: "Este campo es necesario", minLength: { value: 6, message: "La contrasenha debe ser de al menos 6 caracteres" } })}
        />
        {errors.password && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.password.message}
            </span>
          </div>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Confirmar Password:
        <input
          type="password"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Este campo es necesario";
              } else if (watch("password") != val) {
                return "Las contrasenhas no son iguales";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.confirmPassword.message}
            </span>
          </div>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Especialidad:
        <select
          {...register("especialidad", { required: "Este campo es requerido" })}
        >
          {especialidadesOptions.map((especialidad) => (
            <option value={especialidad.id}>{especialidad.nombre}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DatosUsuarioDentista;

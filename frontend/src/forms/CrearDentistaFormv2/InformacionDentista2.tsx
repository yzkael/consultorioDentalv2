import { useFormContext } from "react-hook-form";
import { CrearDentistaFormType } from "../../types/app-types";
import { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client"


type InformacionDentista2Props = {
  handleBack: () => void;
}

const InformacionDentista2 = ({ handleBack }: InformacionDentista2Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CrearDentistaFormType>();

  const [correoValue, setCorreoValue] = useState("");

  //En este contexto isError y isLoading son opuestos asi que ambos deben ser usados para la inhabilitacion del boton
  const { data, isError, isLoading } = useQuery(["checkCorreo", correoValue], () => apiClient.checkCorreo(correoValue), { enabled: !!correoValue });


  console.log(isLoading, 4)
  console.log(isError, 3)
  const handleChange = (correo: string) => {
    setCorreoValue(correo);
  }



  return (
    <div className="flex flex-col gap-4">
      <div className=" bg-slate-500 flex justify-center items-center h-5">
        Informacion Personal:
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Correo:
        <input
          type="email"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("correo", {
            required: "Este campo es necesario", onChange: (e) => handleChange(e.target.value), pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingrese un correo válido",
            },
          })}
        />
        {isLoading &&
          <div className="flex justify-center">
            <span className="text-sm text-gray-700">Revisando Disponibilidad...</span>
          </div>}
        {errors.correo && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.correo.message}
            </span>
          </div>
        )}
        {isError && correoValue != "" &&
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">Ese correo ya esta en uso!</span>
          </div>}

      </label>

      <label className="text-gray-700 text-sm font-bold flex-1 mx-10 ">
        Telefono:
        <input
          type="text"
          className="border border-blue-500 w-full py-1 px-2 font-normal"
          {...register("telefono", { required: "Este campo es necesario", maxLength: { value: 10, message: "Debe ser 10 caracteres como maximo" } })}
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

      <div className="flex justify-between w-[80%] mx-auto">
        <button
          type="button"
          onClick={() => handleBack()}
          disabled={isLoading || (isError && correoValue != "")}
          className="py-2 px-4 bg-slate-700 rounded-lg w-[5rem] flex justify-center items-center hover:bg-slate-500 text-white font-semibold cursor-pointer disabled:bg-black "
        >
          Back
        </button>

        {/* Deteca Solito que es un boton y que le dara Next*/}
        <button className="py-2 px-4 bg-slate-700 rounded-lg w-[5rem] flex justify-center items-center hover:bg-slate-500 text-white font-semibold cursor-pointer disabled:bg-black"
          disabled={isLoading || (isError && correoValue != "")}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default InformacionDentista2;

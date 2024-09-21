import { useFormContext } from "react-hook-form";
import { CrearDentistaFormType } from "../../types/app-types";
import { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client"


const InformacionDentista2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CrearDentistaFormType>();

  const [correoValue, setCorreoValue] = useState("");

  const { data: correoResultado } = useQuery(["checkCorreo", correoValue], () => apiClient.checkCorreo(correoValue), { enabled: !!correoValue });


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
        {errors.correo && (
          <div className="flex justify-center">
            <span className="text-sm text-red-600 ">
              {errors.correo.message}
            </span>
          </div>
        )}
        {!correoResultado && correoValue != "" &&
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
      {/* Deteca Solito que es un boton y que le dara Next*/}
      <button className="py-2 px-4 bg-slate-700 rounded-lg w-[5rem] flex justify-center items-center hover:bg-slate-500 text-white font-semibold cursor-pointer">
        Next
      </button>
    </div>
  );
};

export default InformacionDentista2;

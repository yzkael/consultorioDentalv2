import { useFormContext } from "react-hook-form";
import { CrearAdmFormType } from "../../types/app-types";
import { cargoOptions } from "../../config/config-files";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from '../../api-client'
type DatosUsuarioAdmProps = {
    handleBack: () => void;

}



const DatosUsuarioAdm = ({ handleBack }: DatosUsuarioAdmProps) => {

    const [usernameData, setUsernameData] = useState("");
    const [usernameDebouncer, setUsernameDebouncer] = useState("");


    const { isError, isLoading } = useQuery(["checkUsername", usernameDebouncer], () => apiClient.checkUsername(usernameDebouncer), {
        enabled: !!usernameDebouncer
    })


    useEffect(() => {
        const handler = setTimeout(() => {
            setUsernameDebouncer(usernameData)
        }, 200)
        return () => clearTimeout(handler);
    }, [usernameData])


    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext<CrearAdmFormType>();
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
                    {...register("username", { required: "Este campo es necesario", onChange: (e) => setUsernameData(e.target.value) })}

                />
                {errors.username && (
                    <div className="flex justify-center">
                        <span className="text-sm text-red-600 ">
                            {errors.username.message}
                        </span>
                    </div>
                )}
                {(isLoading && usernameData) && <div className=" flex justify-center"><span className="text-sm text-red-600">Cargando.....</span></div>}
                {(isError && usernameData != "") && <div className=" flex justify-center"><span className="text-sm text-red-600">Ese username ya esta siendo utilizado!</span></div>}
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
                    {...register("cargo", { required: "Este campo es requerido" })}
                >
                    {cargoOptions.map((cargo) => (
                        <option value={cargo.id}>{cargo.nombre}</option>
                    ))}
                </select>
            </label>
            <div className="flex justify-between w-[80%] mx-auto">
                <button
                    type="button"
                    onClick={() => handleBack()}
                    className="py-2 px-4 bg-slate-700 rounded-lg w-[5rem] flex justify-center items-center hover:bg-slate-500 text-white font-semibold cursor-pointer disabled:bg-slate-900 disabled:text-red-600"
                >
                    Back
                </button>
                <button className="py-2 px-4 bg-slate-700 rounded-lg w-[5rem] flex justify-center items-center hover:bg-slate-500 text-white font-semibold cursor-pointer disabled:bg-black"
                    type="submit"
                >
                    Submit
                </button>

            </div>

        </div>
    );
};

export default DatosUsuarioAdm;

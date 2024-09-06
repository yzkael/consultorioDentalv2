import { especialidadesOptions } from "../../config/config-files";

type CrearEmpleadoProps = {
  setPaginaActual: (prev: any) => void;
};

const Parte3 = ({ setPaginaActual }: CrearEmpleadoProps) => {
  return (
    <div className="w-full h-full md:w-[60vw] md:h-[80vh] min-w-[60vw] relative min-h-[80vh] bg-teal-500 rounded-lg shadow-2xl">
      <div className="bg-blue-400 absolute text-white font-semibold w-full h-10 flex justify-center items-center text-2xl rounded-lg">
        Informacion de Usuario:
      </div>
      <form className="flex flex-col h-full justify-around items-center pt-5">
        {/* Username Input */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Username:
          <input type="text" className="rounded-md" />
        </div>
        {/* Password */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Password:
          <input type="password" className="rounded-md" />
        </div>
        {/* Confirmar Password */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Confirmar Password:
          <input type="password" className="rounded-md" />
        </div>
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Elegir Especialidad:
          <select name="especialidad">
            {especialidadesOptions.map((especialidad) => (
              <option value={especialidad}>{especialidad}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between w-full">
          {/* Back */}
          <button
            className="py-2 px-4 w-max self-end ml-10 bg-purple-600 rounded-lg"
            onClick={() => setPaginaActual((prev: any) => prev - 1)}
          >
            Back
          </button>
          {/* Submit */}
          <button
            className="py-2 px-4 w-max self-end ml-10 bg-purple-600 rounded-lg"
            type="submit"
          >
            Submit
          </button>
          {/* Next */}
          <button
            className="py-2 px-4 w-max self-end mr-10 bg-purple-600 rounded-lg invisible"
            onClick={() => setPaginaActual((prev: any) => prev + 1)}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Parte3;

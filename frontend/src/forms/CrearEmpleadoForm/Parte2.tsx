type CrearEmpleadoProps = {
  setPaginaActual: (prev: any) => void;
};

const Parte2 = ({ setPaginaActual }: CrearEmpleadoProps) => {
  return (
    <div className="w-full h-full md:w-[60vw] md:h-[80vh] min-w-[60vw] min-h-[80vh] bg-slate-500 rounded-lg shadow-2xl">
      <form className="flex flex-col h-full justify-around items-center">
        {/* Direccion Input */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Direccion:
          <input type="text" className="rounded-md" />
        </div>
        {/* Telefono */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Telefono:
          <input type="text" className="rounded-md" />
        </div>
        {/* Correo */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Correo:
          <input type="email" className="rounded-md" />
        </div>
        {/* Fecha */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Fecha Nacimiento:
          <input type="date" className="rounded-md" />
        </div>
        <div className="flex justify-between w-full">
          {/* Back */}
          <button
            className="py-2 px-4 w-max self-end ml-10 bg-purple-600 rounded-lg"
            onClick={() => setPaginaActual((prev: any) => prev - 1)}
          >
            Back
          </button>
          {/* Next */}
          <button
            className="py-2 px-4 w-max self-end mr-10 bg-purple-600 rounded-lg"
            onClick={() => setPaginaActual((prev: any) => prev + 1)}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Parte2;

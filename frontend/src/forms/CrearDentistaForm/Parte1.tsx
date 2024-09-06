type CrearEmpleadoProps = {
  setPaginaActual: (prev: any) => void;
};

const parte1 = ({ setPaginaActual }: CrearEmpleadoProps) => {
  return (
    <div className="w-full h-full md:w-[60vw] md:h-[80vh] min-w-[60vw] relative min-h-[80vh] bg-teal-500 rounded-lg shadow-2xl">
      <div className="bg-blue-400 absolute text-white font-semibold w-full h-10 flex justify-center items-center text-2xl rounded-lg">
        Informacion Personal:
      </div>
      <form className="flex flex-col h-full justify-around items-center pt-5">
        {/* Nombre Input */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Nombre:
          <input type="text" className="rounded-md" />
        </div>
        {/* Apellido Paterno */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Apellido Paterno:
          <input type="text" className="rounded-md" />
        </div>
        {/* Apellido Materno */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Apellido Materno:
          <input type="text" className="rounded-md" />
        </div>
        {/* Carnet */}
        <div className="flex flex-col min-w-[50%] text-2xl font-semibold">
          Carnet:
          <input type="text" className="rounded-md" />
        </div>
        {/* Next */}
        <button
          className="py-2 px-4 w-max self-end mr-10 bg-purple-600 rounded-lg"
          onClick={() => setPaginaActual((prev: any) => prev + 1)}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default parte1;

import { Link } from "react-router-dom";
import { FaComputer } from "react-icons/fa6";
import { PiToothLight } from "react-icons/pi";

const AdministrarEmpleado = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-full h-full md:w-[60vw] md:h-[80vh] min-w-[60vw] relative min-h-[80vh] bg-teal-500 rounded-lg shadow-2xl flex flex-col justify-center items-center gap-5 ">
                <h1 className="text-white text-3xl font-bold mt-20 md:mt-0">
                    Que Empleado Deseas Administrar?
                </h1>
                <div className="w-full h-full flex justify-center items-center gap-10 md:w-[50%] md:h-[50%]">
                    {/* Administrative Card */}
                    <div className="flex flex-col justify-center items-center">
                        <Link
                            to={"/empleados/Administrar/administrativos"}
                            className="bg-blue-700 py-10 px-20 rounded-lg"
                        >
                            <FaComputer size={100} color="white" />
                        </Link>
                        <p className="text-white mt-2 font-semibold">Administrar Administrativo</p>
                    </div>

                    {/* Dentist Card */}
                    <div className="flex flex-col justify-center items-center">
                        <Link
                            to={"/empleados/Administrar/dentistas"}
                            className="bg-blue-700 py-10 px-20 rounded-lg"
                        >
                            <PiToothLight size={100} color="white" />
                        </Link>
                        <p className="text-white mt-2 font-semibold">Administrar Dentista</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdministrarEmpleado;

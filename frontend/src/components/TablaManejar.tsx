import { useAuth } from "../context/RoleContextProvider";
import TablaManejarBody from "./TablaManejarBody";

type TablaManejarProps = {
    data: any; //Valores que seran expuestos en la tabla
    handleClick: (link: string) => void; //Funcion para mostrar el prop de estas seguro Delete
    differentAttribute: string; //Diferente Atributo en la tabla EJ: Cargo o especialidad en medicos y Adm
    dataName: string; //Simple string para los link
    paciente?: boolean; //Cambia la tabla en caso de que sea Un paciente
}

const TablaManejar = ({ data, differentAttribute, handleClick, dataName, paciente }: TablaManejarProps) => {
    const { role } = useAuth();

    return (
        <table className="min-w-full">
            <thead className="bg-slate-600 text-white">
                <tr className="w-full">
                    <th className="px-4 py-2 whitespace-nowrap">Nombre</th>
                    <th className="px-4 py-2 whitespace-nowrap">Apellido Paterno</th>
                    <th className="px-4 py-2 whitespace-nowrap">Apellido Materno</th>
                    {paciente ? <>
                        <th className="px-4 py-2 whitespace-nowrap">Carnet</th>
                        <th className="px-4 py-2 whitespace-nowrap">Telefono</th></> :
                        <>
                            <th className="px-4 py-2 whitespace-nowrap">Usuario</th>
                            <th className="px-4 py-2 whitespace-nowrap">
                                {differentAttribute.charAt(0).toUpperCase() + differentAttribute.slice(1)}
                            </th></>}

                    {Number(role) === 4 ? (
                        <>
                            <th className="px-4 py-2 whitespace-nowrap">Editar</th>
                            <th className="px-4 py-2 whitespace-nowrap">Eliminar</th>
                        </>
                    ) : (
                        <th className="px-4 py-2 whitespace-nowrap">Ver</th>
                    )}
                </tr>
            </thead>
            {data && (
                //Terrible Prop Drilling pero me cago en todo
                <TablaManejarBody data={data} differentAttribute={differentAttribute} paciente={paciente} handleClick={handleClick} dataName={dataName} />
            )}
        </table>
    );
}

export default TablaManejar;

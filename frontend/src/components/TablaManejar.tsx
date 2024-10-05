import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../context/RoleContextProvider";

type TablaManejarProps = {
    data: any; //Valores que seran expuestos en la tabla
    handleClick: (link: string) => void; //Funcion para mostrar el prop de estas seguro Delete
    differentAttribute: string; //Diferente Atributo en la tabla EJ: Cargo o especialidad en medicos y Adm
    dataName: string; //Simple string para los link
}

const TablaManejar = ({ data, differentAttribute, handleClick, dataName }: TablaManejarProps) => {
    const { role } = useAuth();

    return (
        <table className="min-w-full">
            <thead className="bg-slate-600 text-white">
                <tr className="w-full">
                    <th className="px-4 py-2 whitespace-nowrap">Nombre</th>
                    <th className="px-4 py-2 whitespace-nowrap">Apellido Paterno</th>
                    <th className="px-4 py-2 whitespace-nowrap">Apellido Materno</th>
                    <th className="px-4 py-2 whitespace-nowrap">Usuario</th>
                    <th className="px-4 py-2 whitespace-nowrap">
                        {differentAttribute.charAt(0).toUpperCase() + differentAttribute.slice(1)}
                    </th>
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
                <tbody className="bg-white">
                    {data.map((singleData: any) => (
                        <tr
                            key={singleData.id_persona}
                            className="border-b hover:bg-slate-100 transition-colors duration-200"
                        >
                            <td className="px-4 py-2 whitespace-nowrap">{singleData.nombre}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{singleData.appaterno}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{singleData.apmaterno}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{singleData.username}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{singleData[differentAttribute]}</td>
                            {Number(role) === 4 ? (
                                <>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <Link to={`editar-${dataName}/${singleData.id_persona}`}>
                                            <FaUserEdit
                                                className="text-slate-600 hover:text-slate-800 hover:scale-110 transition-colors duration-200"
                                                size={20}
                                            />
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <button onClick={() => handleClick(singleData.id_persona)}>
                                            <MdDeleteForever
                                                className="text-slate-600 hover:text-slate-800 transition-colors hover:scale-110 duration-200"
                                                size={20}
                                            />
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <td className="px-4 py-2 whitespace-nowrap">hi</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            )}
        </table>
    );
}

export default TablaManejar;

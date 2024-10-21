import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../context/RoleContextProvider";

type TablaManejarBodyProps = {
    data: any;
    differentAttribute: string;
    paciente?: boolean;
    handleClick?: (link: string) => void;
    dataName?: string;
    //Para manejar el ver 
    handleSelect?: (idPersona: number) => void;
    selected?: number;
}

const TablaManejarBody = ({ data, differentAttribute, paciente, handleClick, dataName, handleSelect, selected }: TablaManejarBodyProps) => {
    const { role } = useAuth();

    return (
        <tbody className="bg-white">
            {paciente ? <>
                {/*         PARA LOS PACIENTES */}
                {data.map((singleData: any) => (
                    <tr
                        onClick={() => { handleSelect ? handleSelect(singleData.id_persona) : null }}
                        key={singleData.id_persona}
                        className={singleData.id_persona == selected ? "border-b cursor-pointer  bg-slate-400 transition-colors duration-200" : "border-b cursor-pointer  hover:bg-slate-300 transition-colors duration-200"}
                    >
                        <td className="px-4 py-2 whitespace-nowrap">{singleData.nombre}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{singleData.appaterno}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{singleData.apmaterno}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{singleData.carnet}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{singleData.telefono}</td>
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
                                    <button onClick={() => handleClick ? handleClick(singleData.id_persona) : null}>
                                        <MdDeleteForever
                                            className="text-slate-600 hover:text-slate-800 transition-colors hover:scale-110 duration-200"
                                            size={20}
                                        />
                                    </button>
                                </td>
                            </>
                        ) : (
                            //Aqui vendra la opcion Para ver a los que no son SUDO USERS

                            <td className="px-4 py-2 whitespace-nowrap">hi</td>
                        )}
                    </tr>
                ))}</> :
                <>
                    {/* PARA LOS TRABAJADORES */}
                    {data.map((singleData: any) => (
                        <tr

                            onClick={() => { handleSelect ? handleSelect(singleData.id_persona) : null }}
                            key={singleData.id_persona}
                            className={singleData.id_persona == selected ? "border-b cursor-pointer  bg-slate-400 transition-colors duration-200" : "border-b cursor-pointer  hover:bg-slate-300 transition-colors duration-200"}
                        >
                            <td className="px-4 py-2 whitespace-nowrap">{singleData.nombre}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{singleData.appaterno}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{singleData.apmaterno}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{singleData.username}</td>
                            <td className="px-4 py-2  whitespace-nowrap">{singleData[differentAttribute]}</td>
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
                                        <button onClick={() => handleClick ? handleClick(singleData.id_persona) : null}>
                                            <MdDeleteForever
                                                className="text-slate-600 hover:text-slate-800 transition-colors hover:scale-110 duration-200"
                                                size={20}
                                            />
                                        </button>
                                    </td>
                                </>
                            ) : (
                                //Aqui vendra la opcion Para ver a los que no son SUDO USERS
                                <td className="px-4 py-2 whitespace-nowrap">hi</td>
                            )}
                        </tr>
                    ))}

                </>}

        </tbody>
    )
}

export default TablaManejarBody

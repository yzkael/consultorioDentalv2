import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../context/RoleContextProvider";

type TablaManejarBodyProps = {
    data: any;
    differentAttribute: string;
    paciente?: boolean;
    handleClick: (link: string) => void;
    dataName: string;
}

const TablaManejarBody = ({ data, differentAttribute, paciente, handleClick, dataName }: TablaManejarBodyProps) => {
    const { role } = useAuth();


    return (
        //Hice al reves la logica de si hay pacientes... 
        <tbody className="bg-white">
            {paciente ? <>
                {data.map((singleData: any) => (
                    <tr
                        key={singleData.id_persona}
                        className="border-b hover:bg-slate-100 transition-colors duration-200"
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
                                    <button onClick={() => handleClick(singleData.id_persona)}>
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

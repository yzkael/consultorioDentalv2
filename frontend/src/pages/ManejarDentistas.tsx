import { useQuery, useMutation } from "react-query";
import * as apiClient from "../api-client";
import TitleMenus from "../components/TitleMenus";
import { ColorRing, TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import SearchBar from "../components/SearchBar";
import { ManejarDentistaSearch } from "../types/app-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManejarDentistas = () => {
  //Valores de busqueda
  const [searchValues, setSearchValues] = useState<ManejarDentistaSearch>({ searchValue: "", searchParams: "" })


  //Logica del fetch (getDentistas)
  const { data: dentistas, isLoading } = useQuery(
    ["searchDentistas", searchValues],
    () => apiClient.searchDentista(searchValues), {
    enabled: !!searchValues,
    retry: 1,
    refetchOnWindowFocus: false
  }
  );

  const navigate = useNavigate();

  //Logica de Delete
  const { mutate } = useMutation(apiClient.deleteDentista, {
    onSuccess: () => {
      alert("Deleted Succesfully");
      navigate("/dashboard/dentistas/");
    },
    onError: () => {
      alert("Something went wrong");
    },
  });
  const handleClick = (idDentista: string) => {
    mutate(idDentista);
  };

  // if (isLoading) {
  //   return (
  //     <div className="w-[100vw] h-screen flex justify-center items-center">
  //       <ColorRing
  //         visible={true}
  //         height="100%"
  //         width="100%"
  //         ariaLabel="color-ring-loading"
  //         wrapperStyle={{}}
  //         wrapperClass="color-ring-wrapper"
  //         colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
  //       />
  //     </div>
  //   );
  // }
  const handleSearch = (data: ManejarDentistaSearch) => {
    setSearchValues(data);
  }

  return (
    <div className="flex flex-col h-screen">
      <TitleMenus title="Administrar Dentistas" />
      <div className="flex-grow flex flex-col items-center overflow-hidden p-4">
        <SearchBar handleSearch={handleSearch} />
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              {isLoading ? <div className="w-full h-screen flex justify-center items-center">
                <div className="w-max h-max  flex justify-center items-center mb-10">
                  <TailSpin
                    visible={true}
                    height="100%"
                    width="100%"
                    color="#D10056"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              </div> : <table className="min-w-full">
                <thead className="bg-slate-600 text-white">
                  <tr>
                    <th className="px-4 py-2 whitespace-nowrap">Nombre</th>
                    <th className="px-4 py-2 whitespace-nowrap">Apellido Paterno</th>
                    <th className="px-4 py-2 whitespace-nowrap">Apellido Materno</th>
                    <th className="px-4 py-2 whitespace-nowrap">Usuario</th>
                    <th className="px-4 py-2 whitespace-nowrap">Especialidad</th>
                    <th className="px-4 py-2 whitespace-nowrap">Editar</th>
                    <th className="px-4 py-2 whitespace-nowrap">Eliminar</th>
                  </tr>
                </thead>
                {dentistas &&
                  <tbody className="bg-white">
                    {dentistas.map((dentista) => (
                      <tr
                        key={dentista.id_persona}
                        className="border-b hover:bg-slate-100 transition-colors duration-200"
                      >
                        <td className="px-4 py-2 whitespace-nowrap">{dentista.nombre}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{dentista.appaterno}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{dentista.apmaterno}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{dentista.username}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{dentista.especialidad}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Link to={`/dentistas/editar-dentista/${dentista.id_persona}`}>
                            <FaUserEdit
                              className="text-slate-600 hover:text-slate-800 hover:scale-110 transition-colors duration-200"
                              size={20}
                            />
                          </Link>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <button onClick={() => handleClick(dentista.id_persona)}>
                            <MdDeleteForever
                              className="text-slate-600 hover:text-slate-800 transition-colors hover:scale-110 duration-200"
                              size={20}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                }
              </table>}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManejarDentistas;

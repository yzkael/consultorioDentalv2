import { useQuery, useMutation } from "react-query";
import * as apiClient from "../api-client";
import TitleMenus from "../components/TitleMenus";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import SearchBar from "../components/SearchBar";

const ManejarDentistas = () => {
  //Logica del fetch (getDentistas)
  const { data: dentistas, isLoading } = useQuery(
    "allDentistas",
    apiClient.getAllDentistas
  );
  //Logica de Delete
  const { mutate } = useMutation(apiClient.deleteDentista, {
    onSuccess: () => {
      alert("Deleted Succesfully");
    },
    onError: () => {
      alert("Something went wrong");
    },
  });
  const handleClick = (idDentista: string) => {
    mutate(idDentista);
  };

  if (isLoading || !dentistas) {
    return (
      <div className="w-[100vw] h-screen flex justify-center items-center">
        <ColorRing
          visible={true}
          height="100%"
          width="100%"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }
  const handleSearch = () => {
    console.log("handled")
  }

  return (
    <div className="flex flex-col h-screen  md:gap-10">
      <TitleMenus title="Adminsitrar Dentistas" />
      <SearchBar handleSearch={handleSearch}></SearchBar>
      <table className="w-full h-full max-h-screen max-w-screen-sm  md:w-[60vw] mx-auto md:h-[80vh] bg-slate-600 border">
        <thead className="border border-black max-h-2 max-w-screen-sm">
          <tr className="border border-black ">
            <th>Nombre:</th>
            <th>Apellido Paterno:</th>
            <th>Apellido Materno:</th>
            <th>Usuario:</th>
            <th>Especialidad</th>
            <th>Eliminar</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody className="overflow-scroll">
          {dentistas.map((dentista) => (
            <tr
              className="h-[100px] hover:bg-slate-400"
              key={dentista.id_persona}
            >
              <td>{dentista.nombre}</td>
              <td>{dentista.appaterno}</td>
              <td>{dentista.apmaterno}</td>
              <td>{dentista.username}</td>
              <td>{dentista.especialidad}</td>
              <td>
                <Link to={`/dentistas/editar-dentista/${dentista.id_persona}`}>
                  <FaUserEdit
                    color="white"
                    className="hover:fill-slate-600 hover:scale-110 transition-transform duration-200 "
                    size={20}
                  />
                </Link>
              </td>
              <td>
                <button onClick={() => handleClick(dentista.id_persona)}>
                  <MdDeleteForever
                    color="white"
                    className="hover:fill-slate-600 hover:scale-110 transition-transform duration-200 "
                    size={20}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManejarDentistas;

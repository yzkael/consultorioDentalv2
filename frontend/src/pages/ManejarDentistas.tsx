import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import TitleMenus from "../components/TitleMenus";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
const ManejarDentistas = () => {
  const { data: dentistas, isLoading } = useQuery(
    "allDentistas",
    apiClient.getAllDentistas
  );
  if (isLoading || !dentistas) {
    return (
      <div className="w-full h-full flex justify-center items-center">
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

  return (
    <div className="flex flex-col h-screen md:gap-10 justify-center items-center">
      <TitleMenus title="Adminsitrar Dentistas" />
      <table className="w-full h-full md:w-[60vw] md:h-[80vh] bg-slate-600">
        <th>Nombre:</th>
        <th>Apellido Paterno:</th>
        <th>Apellido Materno:</th>
        <th>Usuario:</th>
        <th>Especialidad</th>
        <th>Eliminar</th>
        <th>Editar</th>
        {dentistas.map((dentista) => (
          <tr>
            <td>{dentista.nombre}</td>
            <td>{dentista.appaterno}</td>
            <td>{dentista.apmaterno}</td>
            <td>{dentista.username}</td>
            <td>{dentista.especialidad}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ManejarDentistas;

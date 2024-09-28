import { useQuery, useMutation } from "react-query";
import * as apiClient from "../api-client";
import TitleMenus from "../components/TitleMenus";
import { TailSpin } from "react-loader-spinner";
import SearchBar from "../components/SearchBar";
import { ManejarSearch } from "../types/app-types";
import { useState } from "react";
import { useQueryClient } from "react-query";
import TablaManejar from "../components/TablaManejar";
import { searchDentistaOpciones as options } from "../config/config-files"
import LoadingSpinner from "../components/LoadingSpinner";


const ManejarDentistas = () => {
  //Valores de busqueda
  const [searchValues, setSearchValues] = useState<ManejarSearch>({ searchValue: "", searchParams: "" })
  const queryClient = useQueryClient();

  //Logica del fetch (getDentistas)
  const { data: dentistas, isLoading } = useQuery(
    ["searchDentistas", searchValues],
    () => apiClient.searchDentista(searchValues), {
    enabled: !!searchValues,
    retry: 1,
    refetchOnWindowFocus: false
  }
  );


  //Logica de Delete
  const { mutate } = useMutation(apiClient.deleteDentista, {
    onSuccess: () => {
      alert("Deleted Succesfully");
      queryClient.invalidateQueries("searchDentistas");
    },
    onError: () => {
      alert("Something went wrong");
    },
  });
  const handleClick = (idDentista: string) => {
    mutate(idDentista);
  };

  const handleSearch = (data: ManejarSearch) => {
    setSearchValues(data);
  }

  return (
    <div className="flex flex-col h-screen">
      <TitleMenus title="Administrar Dentistas" />
      <div className="flex-grow flex flex-col items-center overflow-hidden p-4">
        <SearchBar handleSearch={handleSearch} options={options} />
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              {isLoading ? <LoadingSpinner /> : <TablaManejar data={dentistas} handleClick={handleClick} differentAttribute="especialidad" dataName="dentista" />}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManejarDentistas;

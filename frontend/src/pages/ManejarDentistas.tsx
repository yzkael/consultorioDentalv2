import { useQuery, useMutation } from "react-query";
import * as apiClient from "../api-client";
import TitleMenus from "../components/TitleMenus";
import { TailSpin } from "react-loader-spinner";
import SearchBar from "../components/SearchBar";
import { ManejarDentistaSearch } from "../types/app-types";
import { useState } from "react";
import { useQueryClient } from "react-query";
import TablaManejar from "../components/TablaManejar";


const ManejarDentistas = () => {
  //Valores de busqueda
  const [searchValues, setSearchValues] = useState<ManejarDentistaSearch>({ searchValue: "", searchParams: "" })
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
              </div> : <TablaManejar data={dentistas} handleClick={handleClick} differentAttribute="especialidad" dataName="dentista" />}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManejarDentistas;

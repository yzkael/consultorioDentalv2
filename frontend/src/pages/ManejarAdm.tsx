import { useQuery, useMutation } from "react-query";
import * as apiClient from "../api-client";
import TitleMenus from "../components/TitleMenus";
import { TailSpin } from "react-loader-spinner";
import SearchBar from "../components/SearchBar";
import { ManejarSearch } from "../types/app-types";
import { useState } from "react";
import { useQueryClient } from "react-query";
import TablaManejar from "../components/TablaManejar";
import { searchAdmOpciones } from "../config/config-files";
import LoadingSpinner from "../components/LoadingSpinner";


const ManejarAdm = () => {
    //Valores de busqueda
    const [searchValues, setSearchValues] = useState<ManejarSearch>({ searchValue: "", searchParams: "" })
    const queryClient = useQueryClient();

    //Logica Search Administrativos
    const { data: administrativos, isLoading } = useQuery(
        ["searchAdm", searchValues],
        () => apiClient.searchAdministrativo(searchValues), {
        enabled: !!searchValues,
        retry: 1,
        refetchOnWindowFocus: false
    }
    );


    //Logica de Delete
    const { mutate } = useMutation(apiClient.deleteAdm, {
        onSuccess: () => {
            alert("Deleted Succesfully");
            queryClient.invalidateQueries("searchAdm");
        },
        onError: () => {
            alert("Something went wrong");
        },
    });
    const handleClick = (idAdm: string) => {
        mutate(idAdm);
    };

    const handleSearch = (data: ManejarSearch) => {
        setSearchValues(data);
    }

    return (
        <div className="flex flex-col h-screen">
            <TitleMenus title="Administrar personal Administrativo" />
            <div className="flex-grow flex flex-col items-center overflow-hidden p-4">
                <SearchBar handleSearch={handleSearch} options={searchAdmOpciones} />
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            {isLoading ? <LoadingSpinner /> : <TablaManejar data={administrativos} handleClick={handleClick} differentAttribute="cargo" dataName="administrativo" />}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManejarAdm;

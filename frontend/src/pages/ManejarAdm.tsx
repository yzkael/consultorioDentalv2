import { useQuery, useMutation } from "react-query";
import * as apiClient from "../api-client";
import TitleMenus from "../components/TitleMenus";
import SearchBar from "../components/SearchBar";
import { ManejarSearch } from "../types/app-types";
import { useState } from "react";
import { useQueryClient } from "react-query";
import TablaManejar from "../components/TablaManejar";
import { searchAdmOpciones } from "../config/config-files";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContextProvider";


const ManejarAdm = () => {
    //Valores de busqueda
    //------------TODO: FALTA IMPLEMENTAR LA PAGINATION A ESTA PARTE
    const [searchValues, setSearchValues] = useState<ManejarSearch>({ searchValue: "", searchParams: "" })
    const queryClient = useQueryClient();

    //Valores para popUp Delete
    const [isActive, setActive] = useState(false);
    const [confirmBorrar, setConfirmBorrar] = useState(false);
    const [idDelete, setIdDelete] = useState("");

    //Logica Search Administrativos
    const { data: administrativos, isLoading } = useQuery(
        ["searchAdm", searchValues],
        () => apiClient.searchAdministrativo(searchValues), {
        enabled: !!searchValues,
        retry: 1,
        refetchOnWindowFocus: false
    }
    );

    const { notifyError, notifySuccess } = useToast();

    //Logica de Delete
    const { mutate } = useMutation(apiClient.deleteAdm, {
        onSuccess: () => {
            notifySuccess("Administrativo Borrado Exitosamente!");
            queryClient.invalidateQueries("searchAdm");
        },
        onError: () => {
            notifyError("Error al eliminar Administrativo. Porfavor intentelo mas tarde");
        },
    });

    const handleClick = (idDentista: string) => {
        setActive(prev => !prev); //Activa la visibilidad del prop
        setIdDelete(idDentista);
    };


    const reaccionClick = (respuesta: boolean) => {
        if (respuesta) {
            mutate(idDelete);
            setConfirmBorrar(false);
        }
    }
    const handleSearch = (data: ManejarSearch) => {
        setSearchValues(data);

    }

    return (
        <div className="flex flex-col h-screen">
            <TitleMenus title="Administrar personal Administrativo" />
            <ConfirmDialog message="Desear eliminar este dato?" setRespuesta={setConfirmBorrar} isActive={isActive} setActive={setActive} reactClick={reaccionClick} />
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

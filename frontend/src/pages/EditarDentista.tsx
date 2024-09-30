import { useMutation, useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { EditarDentistaFormType } from '../types/app-types';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ManageEditarDentista from '../forms/EditarDentistaForm/ManageEditarDentista';
import { useToast } from '../context/ToastContextProvider';


const EditarDentista = () => {
  const { idDentista } = useParams();
  const { notifySuccess, notifyError } = useToast();
  const navigate = useNavigate();
  const { data: dentista, isLoading: fetching } = useQuery(
    ["fetchDentista", idDentista], // Include idDentista in the query key
    () => apiClient.getSingleDentista(idDentista as string),
    { retry: 0 }
  );

  const { mutate, isLoading } = useMutation(
    ({ idDentista, data }: { idDentista: string; data: EditarDentistaFormType }) =>
      apiClient.updateDentista(idDentista, data),
    {
      onSuccess: () => {
        notifySuccess("Dentista editado exitosamente!");
        navigate('/empleados/administrar/dentistas');
      },
      onError: () => {
        notifyError("Formato de datos invalido");
      },
    }
  );

  const onSave = (data: EditarDentistaFormType) => {
    if (idDentista) {
      mutate({ idDentista, data });
    } else {
      <Navigate to={'/'} />; // TODO: Improve Error Handler
    }
  };

  return (
    <div className='w-full h-screen'>
      <ManageEditarDentista isEditing={isLoading} onSave={onSave} dentista={dentista} isFetching={fetching} />
    </div>
  );
};

export default EditarDentista;

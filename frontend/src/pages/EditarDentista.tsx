import { useMutation, useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { EditarDentistaFormType } from '../types/app-types';
import { Navigate, useParams } from 'react-router-dom';
import ManageEditarDentista from '../forms/EditarDentistaForm/ManageEditarDentista';

const EditarDentista = () => {
  const { idDentista } = useParams();

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
        alert("Success");
      },
      onError: () => {
        alert("Error:");
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
    <ManageEditarDentista isEditing={isLoading} onSave={onSave} dentista={dentista} isFetching={fetching} />
  );
};

export default EditarDentista;

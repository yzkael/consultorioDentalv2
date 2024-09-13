import { useMutation, useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { EditarDentistaFormType } from '../types/app-types';
import { Navigate, useParams } from 'react-router-dom';
import ManageEditarDentista from '../forms/EditarDentistaForm/ManageEditarDentista';

const EditarDentista = () => {
  const { idDentista } = useParams();
  const { data: dentista, isLoading: fetching } = useQuery("fetchDentista", () => apiClient.getSingleDentista(idDentista as string));
  // Use mutation with the correct object structure
  const { mutate, isLoading } = useMutation(
    ({ idDentista, data }: { idDentista: string; data: EditarDentistaFormType }) =>
      apiClient.updateDentista(idDentista, data),
    {
      onSuccess: () => {
        // Handle success (e.g., navigate or show a success message)
        alert("Success");
      },
      onError: () => {
        // Handle error
        alert("Error:");
      },
    }
  );

  const onSave = (data: EditarDentistaFormType) => {
    if (idDentista) {
      mutate({ idDentista, data }); // Pass both as an object
    } else {
      <Navigate to={'/'} /> //TODO: Improve Error Handler
    }
  };

  return (
    <ManageEditarDentista isEditing={isLoading} onSave={onSave} dentista={dentista} isFetching={fetching} />
  );
};

export default EditarDentista;

import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import ManageDentistaForm from "../forms/CrearDentistaFormv2/ManageDentistaForm";
import { CrearDentistaFormType } from "../types/app-types";

const CrearEmpleado = () => {
  const { mutate, isLoading } = useMutation(
    "crearDentista",
    apiClient.crearDentista,
    {
      onError: () => {
        alert("Something went wrong");
      },
      onSuccess: () => {
        alert("Something went right!");
      },
    }
  );

  const handleSave = (dentistaFormData: CrearDentistaFormType) => {
    mutate(dentistaFormData);
  };

  return <ManageDentistaForm onSave={handleSave} isLoading={isLoading} />;
};

export default CrearEmpleado;

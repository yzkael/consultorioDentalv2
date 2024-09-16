import { useMutation } from "react-query";
import ManageDentistaForm from "../forms/CrearDentistaFormv2/ManageDentistaForm";
import { CrearDentistaFormType } from "../types/app-types";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
const CrearEmpleado = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    "crearDentista",
    apiClient.crearDentista,
    {
      onError: (errors: Error) => {
        alert(errors)
      },
      onSuccess: () => {
        alert("Yay");
        navigate("/dashboard/dentistas/");
      },
    }
  );

  const handleSave = (dentistaFormData: CrearDentistaFormType) => {
    mutate(dentistaFormData);
  };

  return <ManageDentistaForm onSave={handleSave} isLoading={isLoading} />;
};

export default CrearEmpleado;

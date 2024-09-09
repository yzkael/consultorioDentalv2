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
      onError: () => {
        alert("Something went wrong");
      },
      onSuccess: () => {
        alert("Something went right!");
        navigate("/dashboard/empleados/");
      },
    }
  );

  const handleSave = (dentistaFormData: CrearDentistaFormType) => {
    mutate(dentistaFormData);
  };

  return <ManageDentistaForm onSave={handleSave} isLoading={isLoading} />;
};

export default CrearEmpleado;

import {
  CrearDentistaFormType,
  EditarDentistaFormType,
  ManejarDentistasTabla,
} from "./types/app-types";

const BASE_API_URL = import.meta.env.VITE_BASE_URL as string;

export const crearDentista = async (data: CrearDentistaFormType) => {
  const response = await fetch(`${BASE_API_URL}/api/dentistas/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

export const getAllDentistas = async (): Promise<ManejarDentistasTabla[]> => {
  const response = await fetch(`${BASE_API_URL}/api/dentistas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error while fetching Dentistas");
  }
  const responseData = await response.json();
  return responseData;
};

//data Type reutilizado
export const deleteDentista = async (idDentista: string) => {
  console.log(idDentista);
  const response = await fetch(`${BASE_API_URL}/api/dentistas/${idDentista}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar dentista");
  }
  const responseData = await response.json();
  return responseData;
};

export const getSingleDentista = async (
  idDentista: string
): Promise<EditarDentistaFormType> => {
  const response = await fetch(`${BASE_API_URL}/api/dentistas/${idDentista}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log(await response.json());

  if (!response.ok) {
    throw new Error("Something went wrong while fetching dentista");
  }
  const returnData = await response.json();
  return returnData;
};

export const updateDentista = async (
  idDentista: string,
  data: EditarDentistaFormType
) => {
  const response = await fetch(`${BASE_API_URL}/api/dentistas/${idDentista}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong while updating");
  }

  const returnData = await response.json();
  return returnData;
};

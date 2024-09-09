import {
  CrearDentistaFormType,
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

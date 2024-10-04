import { JwtPayload } from "./context/RoleContextProvider";
import {
  CrearAdmFormType,
  CrearDentistaFormType,
  EditarDentistaFormType,
  ManejarSearch,
  ManejarDentistasTabla,
  RevisarDato,
  ManejarAdministrativoTabla,
  EditarAdmFormType,
  LoginFormType,
} from "./types/app-types";

const BASE_API_URL = import.meta.env.VITE_BASE_URL as string;

export const crearDentista = async (data: CrearDentistaFormType) => {
  console.log(data);
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

export const searchDentista = async (
  data: ManejarSearch
): Promise<ManejarDentistasTabla[]> => {
  if (data.searchParams == null || data.searchParams == "")
    throw new Error("No search Params");
  const response = await fetch(`${BASE_API_URL}/api/dentistas/search`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

export const checkCarnet = async (carnet: string): Promise<RevisarDato> => {
  const response = await fetch(`${BASE_API_URL}/api/auth/check-carnet`, {
    method: "POST",
    body: JSON.stringify({ carnet }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

export const checkCorreo = async (correo: string): Promise<RevisarDato> => {
  const response = await fetch(`${BASE_API_URL}/api/auth/check-correo`, {
    method: "POST",
    body: JSON.stringify({ correo }),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

export const checkUsername = async (username: string): Promise<RevisarDato> => {
  const response = await fetch(`${BASE_API_URL}/api/auth/check-username`, {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

export const crearAdministrativo = async (data: CrearAdmFormType) => {
  const response = await fetch(`${BASE_API_URL}/api/administrativo`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

export const searchAdministrativo = async (
  data: ManejarSearch
): Promise<ManejarAdministrativoTabla> => {
  console.log(data);
  const response = await fetch(`${BASE_API_URL}/api/administrativo/search`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

export const deleteAdm = async (idAdm: string) => {
  const response = await fetch(
    `${BASE_API_URL}/api/administrativo/delete/${idAdm}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

export const getSingleAdm = async (
  idAdm: string
): Promise<EditarAdmFormType> => {
  const response = await fetch(`${BASE_API_URL}/api/administrativo/${idAdm}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

export const updateAdm = async (idAdm: string, data: EditarAdmFormType) => {
  const response = await fetch(`${BASE_API_URL}/api/administrativo/${idAdm}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong...");
  }
  const returnData = await response.json();
  return returnData;
};

export const signUp = async (data: LoginFormType) => {
  const response = await fetch(`${BASE_API_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

export const logout = async () => {
  const response = await fetch(`${BASE_API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Something went wrong...");
  }
  //No necesita response.json() por que solo se maneja en el navegador: httpOnly cookie
};

export const checkJWT = async (): Promise<JwtPayload> => {
  const response = await fetch(`${BASE_API_URL}/api/auth/check-jwt`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const returnData = await response.json();
  return returnData;
};

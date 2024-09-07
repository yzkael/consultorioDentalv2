import { CrearDentistaFormType } from "./src/types/app-types";

export const crearDentista = async (data: CrearDentistaFormType) => {
  const response = await fetch(`http://localhost:3000/api/dentistas/`, {
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

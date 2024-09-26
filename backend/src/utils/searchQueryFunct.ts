import { searchAdmByCargo } from "../models/administrativoQueries";
import {
  searchDentistaInGeneral,
  searchDentistasByApMaterno,
  searchDentistasByApPaterno,
  searchDentistasByEspecialidad,
  searchDentistasByName,
  searchDentistasByUsername,
} from "../models/Queries";

export const identificarSearchDentista = (searchParametros: string) => {
  switch (searchParametros) {
    case "-buscar-":
      return searchDentistaInGeneral;
    case "nombre":
      return searchDentistasByName;
    case "apPaterno":
      return searchDentistasByApPaterno;
    case "apMaterno":
      return searchDentistasByApMaterno;
    case "usuario":
      return searchDentistasByUsername;
    case "especialidad":
      return searchDentistasByEspecialidad;
    // case "cargo": No va a funcionar debe existir otras queries para los Adminsitrativos
    //   return searchAdmByCargo;
    default:
      return "Not found";
  }
};

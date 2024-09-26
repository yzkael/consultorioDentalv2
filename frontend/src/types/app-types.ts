export type CrearDentistaFormType = {
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  correo: string;
  carnet: string;
  telefono: string;
  fechaNacimiento: Date;
  username: string;
  password: string;
  confirmPassword: string;
  especialidad: number;
};

export type EditarDentistaFormType = {
  nombre: string;
  appaterno: string;
  apmaterno: string;
  correo: string;
  carnet: string;
  telefono: string;
  fechanacimiento: Date | string;
  especialidad: number;
};

export type ManejarDentistasTabla = {
  id_persona: string;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  username: string;
  especialidad: string;
};

export type ManejarDentistaSearch = {
  searchValue: string;
  searchParams: string;
};

//Utilizado para revisar si ya existen los datos unique
export type RevisarDato = {
  result: boolean;
};

export type CrearAdmFormType = {
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  correo: string;
  carnet: string;
  telefono: string;
  fechaNacimiento: Date;
  username: string;
  password: string;
  confirmPassword: string;
  cargo: number;
};

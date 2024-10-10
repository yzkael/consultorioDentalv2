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

//Utilizado como tipo generico para crear Personas y para crear Pacientes
//El valor Creado Por se manejara en el backend

export type CrearPersonaFormType = {
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  correo: string;
  carnet: string;
  telefono: string;
  fechaNacimiento: Date;
};

export type EditarDentistaFormType = {
  nombre: string;
  appaterno: string;
  apmaterno: string;
  correo: string;
  carnet: string;
  telefono: string;
  fechanacimiento: Date | string; //Debe aceptar los dos tipos para asegurarse de que el form le mande bien la info
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

export type ManejarSearch = {
  searchValue: string;
  searchParams: string;
};

//Minusculas por que asi lo devuelve la DB por alguna extranha razon
export type ManejarAdministrativoTabla = {
  id_persona: string;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  username: string;
  cargo: string;
};

//Utilizado para revisar si ya existen los datos unique (correo, carnet, username)
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

export type EditarAdmFormType = {
  nombre: string;
  appaterno: string;
  apmaterno: string;
  correo: string;
  carnet: string;
  telefono: string;
  fechanacimiento: Date | string;
  cargo: number;
};

export type LoginFormType = {
  username: string;
  password: string;
};

export type ManejarPacienteType = {
  id_persona: string;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  carnet: string;
  telefono: string;
};

export type ManejarEditarPacienteType = {
  nombre: string;
  appaterno: string;
  apmaterno: string;
  carnet: string;
  correo: string;
  telefono: string;
};

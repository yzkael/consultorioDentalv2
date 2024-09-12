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
  apPaterno: string;
  apMaterno: string;
  correo: string;
  carnet: string;
  telefono: string;
  fechaNacimiento: Date;
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

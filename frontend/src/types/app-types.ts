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

export type ManejarDentistasTabla = {
  nombre: string;
  appaterno: string;
  apmaterno: string;
  username: string;
  especialidad: string;
};

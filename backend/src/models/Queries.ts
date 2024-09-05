//Revisa si los campos Correo, Carnet y username estan siendo utilizado en la creacion de empleado y los guarda como variables para ser decosntruidas

export const yaExisteEmpleado =
  "SELECT EXISTS (SELECT 1 FROM Personas WHERE correo = $1) AS correo_exists,EXISTS (SELECT 1 FROM Personas WHERE carnet = $2) AS carnet_exists,EXISTS (SELECT 1 FROM Personal WHERE username = $3) AS username_exists;";

export const crearPersona =
  "INSERT INTO Personas(nombre,ap_paterno,ap_materno,carnet,correo,telefono,fecha_nacimiento) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";

export const crearPersonal =
  "INSERT INTO Personal(id_personal,username,password) VALUES ($1,$2,$3) RETURNING *";

export const crearDentistas =
  "INSERT INTO Dentistas(id_dentista,especialidad) VALUES ($1,$2) RETURNING *";

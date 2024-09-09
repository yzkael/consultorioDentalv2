//Revisa si los campos Correo, Carnet y username estan siendo utilizado en la creacion de empleado y los guarda como variables para ser decosntruidas

export const yaExisteEmpleado =
  "SELECT EXISTS (SELECT 1 FROM Personas WHERE correo = $1) AS correo_exists,EXISTS (SELECT 1 FROM Personas WHERE carnet = $2) AS carnet_exists,EXISTS (SELECT 1 FROM Personal WHERE username = $3) AS username_exists;";

export const crearPersona =
  "INSERT INTO Personas(nombre,ap_paterno,ap_materno,carnet,correo,telefono,fecha_nacimiento) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";

export const crearPersonal =
  "INSERT INTO Personal(id_personal,username,password) VALUES ($1,$2,$3) RETURNING *";

export const crearDentistas =
  "INSERT INTO Dentistas(id_dentista,especialidad) VALUES ($1,$2) RETURNING *";

export const getAllDentistas =
  "SELECT persona.nombre AS nombre,persona.ap_paterno AS apPaterno,persona.ap_materno AS apMaterno, personal.username AS username, especialidad.nombre AS especialidad FROM Personas persona JOIN Personal personal ON personal.id_personal = persona.id_persona JOIN Dentistas dentista ON dentista.id_dentista = personal.id_personal JOIN Especialidades especialidad ON especialidad.id_especialidad = dentista.especialidad WHERE personal.fecha_fin IS NULL";

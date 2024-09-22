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
  "SELECT persona.id_persona,persona.nombre AS nombre,persona.ap_paterno AS apPaterno,persona.ap_materno AS apMaterno, personal.username AS username, especialidad.nombre AS especialidad FROM Personas persona JOIN Personal personal ON personal.id_personal = persona.id_persona JOIN Dentistas dentista ON dentista.id_dentista = personal.id_personal JOIN Especialidades especialidad ON especialidad.id_especialidad = dentista.especialidad WHERE personal.fecha_fin IS NULL ORDER BY fecha_crear DESC";

export const updatePersona =
  "UPDATE Personas SET nombre = $1 , ap_paterno = $2, ap_materno = $3, carnet = $4, correo = $5, telefono = $6, fecha_nacimiento = $7 WHERE id_persona = $8 RETURNING *";

export const updatePersonal =
  "UPDATE Personal SET username = $1 , password = $2 WHERE id_personal = $3 RETURNING *";

export const updateDentista =
  "UPDATE Dentistas SET especialidad = $1 WHERE id_dentista = $2 RETURNING *";

export const getDentistaData =
  "SELECT persona.nombre AS nombre, persona.ap_paterno AS apPaterno, persona.ap_materno AS apMaterno, persona.correo AS correo, persona.carnet AS carnet, persona.telefono AS telefono, persona.fecha_nacimiento AS fechaNacimiento, dentista.especialidad AS especialidad FROM Personas persona JOIN Dentistas dentista ON persona.id_persona = dentista.id_dentista WHERE persona.id_persona = $1";

export const checkActive =
  "SELECT username,fecha_fin FROM Personal WHERE id_personal = $1";

export const searchDentistasByName = `
  SELECT 
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    especialidad.nombre AS especialidad
  FROM Personas persona
  JOIN Personal personal ON personal.id_personal = persona.id_persona
  JOIN Dentistas dentista ON dentista.id_dentista = personal.id_personal
  JOIN Especialidades especialidad ON especialidad.id_especialidad = dentista.especialidad
  WHERE personal.fecha_fin IS NULL 
    AND persona.nombre ILIKE '%' || $1 || '%' 
  ORDER BY fecha_crear DESC;
`;
export const searchDentistasByApPaterno = `
  SELECT 
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    especialidad.nombre AS especialidad
  FROM Personas persona
  JOIN Personal personal ON personal.id_personal = persona.id_persona
  JOIN Dentistas dentista ON dentista.id_dentista = personal.id_personal
  JOIN Especialidades especialidad ON especialidad.id_especialidad = dentista.especialidad
  WHERE personal.fecha_fin IS NULL 
    AND persona.ap_paterno ILIKE '%' || $1 || '%' 
  ORDER BY fecha_crear DESC;
`;

export const searchDentistasByApMaterno = `
  SELECT 
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    especialidad.nombre AS especialidad
  FROM Personas persona
  JOIN Personal personal ON personal.id_personal = persona.id_persona
  JOIN Dentistas dentista ON dentista.id_dentista = personal.id_personal
  JOIN Especialidades especialidad ON especialidad.id_especialidad = dentista.especialidad
  WHERE personal.fecha_fin IS NULL 
    AND persona.ap_materno ILIKE '%' || $1 || '%' 
  ORDER BY fecha_crear DESC;
`;
export const searchDentistasByUsername = `
  SELECT 
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    especialidad.nombre AS especialidad
  FROM Personas persona
  JOIN Personal personal ON personal.id_personal = persona.id_persona
  JOIN Dentistas dentista ON dentista.id_dentista = personal.id_personal
  JOIN Especialidades especialidad ON especialidad.id_especialidad = dentista.especialidad
  WHERE personal.fecha_fin IS NULL 
    AND personal.username ILIKE '%' || $1 || '%' 
  ORDER BY fecha_crear DESC;
`;

export const searchDentistasByEspecialidad = `
  SELECT 
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    especialidad.nombre AS especialidad
  FROM Personas persona
  JOIN Personal personal ON personal.id_personal = persona.id_persona
  JOIN Dentistas dentista ON dentista.id_dentista = personal.id_personal
  JOIN Especialidades especialidad ON especialidad.id_especialidad = dentista.especialidad
  WHERE personal.fecha_fin IS NULL 
    AND especialidad.nombre ILIKE '%' || $1 || '%' 
  ORDER BY fecha_crear DESC;
`;

export const searchDentistaInGeneral = `
  SELECT 
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    especialidad.nombre AS especialidad
  FROM Personas persona
  JOIN Personal personal ON personal.id_personal = persona.id_persona
  JOIN Dentistas dentista ON dentista.id_dentista = personal.id_personal
  JOIN Especialidades especialidad ON especialidad.id_especialidad = dentista.especialidad
  WHERE personal.fecha_fin IS NULL 
    AND (
      persona.nombre ILIKE '%' || $1 || '%' OR
      persona.ap_paterno ILIKE '%' || $1 || '%' OR
      persona.ap_materno ILIKE '%' || $1 || '%' OR
      personal.username ILIKE '%' || $1 || '%' OR
      especialidad.nombre ILIKE '%' || $1 || '%'
    )
  ORDER BY fecha_crear DESC;
`;

export const revisarCarnet = `SELECT p.carnet 
FROM Personas p 
JOIN Personal pers 
ON p.id_persona = pers.id_personal 
WHERE p.carnet = $1 AND pers.fecha_fin IS NULL;`;

export const revisarCorreo = ` SELECT p.correo
FROM Personas p
JOIN Personal pers
ON p.id_persona = pers.id_personal
WHERE p.correo = $1 AND pers.fecha_fin IS NULL`;

export const revisarUsername = `SELECT username FROM Personal WHERE username = $1 AND fecha_fin IS NULL`;

export const crearAdministrativoQuery = `INSERT INTO Administrativo(id_administrativo, cargo) VALUES ($1, $2) RETURNING *`;

export const getAllAdm =
  "SELECT persona.id_persona,persona.nombre AS nombre,persona.ap_paterno AS apPaterno,persona.ap_materno AS apMaterno, personal.username AS username, cargo.nombre AS cargo FROM Personas persona JOIN Personal personal ON personal.id_personal = persona.id_persona JOIN Administrativos adm ON adm.id_adminsitrativo = personal.id_personal JOIN Cargos cargo ON cargo.id_especialidad = adm.cargo WHERE personal.fecha_fin IS NULL ORDER BY fecha_crear DESC";

export const searchAdmByCargo = `
  SELECT 
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    cargo.nombre AS cargo
  FROM Personas persona
  JOIN Personal personal ON personal.id_personal = persona.id_persona
  JOIN Administrativo adm ON adm.id_administrativo = personal.id_personal
  JOIN Cargos cargo ON cargo.id_cargo = adm.cargo
  WHERE personal.fecha_fin IS NULL 
    AND cargo.nombre ILIKE '%' || $1 || '%' 
  ORDER BY fecha_crear DESC;
`;

export const searchAdmByName = `
SELECT
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    cargo.nombre AS cargo
FROM Personas persona
JOIN Personal personal ON personal.id_personal = persona.id_persona 
JOIN Administrativo adm ON adm.id_administrativo = personal.id_personal
JOIN Cargos cargo ON cargo.id_cargo = adm.cargo 
WHERE personal.fecha_fin IS NULL 
AND persona.nombre ILIKE '%' || $1 || '%' 
ORDER BY persona.fecha_crear DESC`;

export const searchAdmByApPaterno = `
SELECT
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    cargo.nombre AS cargo
FROM Personas persona
JOIN Personal personal ON personal.id_personal = persona.id_persona 
JOIN Administrativo adm ON adm.id_administrativo = personal.id_personal
JOIN Cargos cargo ON cargo.id_cargo = adm.cargo 
WHERE personal.fecha_fin IS NULL 
AND persona.ap_paterno ILIKE '%' || $1 || '%' 
ORDER BY persona.fecha_crear DESC`;

export const searchAdmByApMaterno = `
SELECT
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    cargo.nombre AS cargo
FROM Personas persona
JOIN Personal personal ON personal.id_personal = persona.id_persona 
JOIN Administrativo adm ON adm.id_administrativo = personal.id_personal
JOIN Cargos cargo ON cargo.id_cargo = adm.cargo 
WHERE personal.fecha_fin IS NULL 
AND persona.ap_materno ILIKE '%' || $1 || '%' 
ORDER BY persona.fecha_crear DESC`;

export const searchAdmByUsername = `
SELECT
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    cargo.nombre AS cargo
FROM Personas persona
JOIN Personal personal ON personal.id_personal = persona.id_persona 
JOIN Administrativo adm ON adm.id_administrativo = personal.id_personal
JOIN Cargos cargo ON cargo.id_cargo = adm.cargo 
WHERE personal.fecha_fin IS NULL 
AND personal.username ILIKE '%' || $1 || '%' 
ORDER BY persona.fecha_crear DESC`;

export const searchAdmInGeneral = `
  SELECT 
    persona.id_persona,
    persona.nombre AS nombre,
    persona.ap_paterno AS apPaterno,
    persona.ap_materno AS apMaterno,
    personal.username AS username,
    cargo.nombre AS cargo
  FROM Personas persona
  JOIN Personal personal ON personal.id_personal = persona.id_persona
  JOIN Administrativo adm ON adm.id_administrativo = personal.id_personal
  JOIN Cargos cargo ON cargo.id_cargo = adm.cargo
  WHERE personal.fecha_fin IS NULL 
    AND (
      persona.nombre ILIKE '%' || $1 || '%' OR
      persona.ap_paterno ILIKE '%' || $1 || '%' OR
      persona.ap_materno ILIKE '%' || $1 || '%' OR
      personal.username ILIKE '%' || $1 || '%' OR
      cargo.nombre ILIKE '%' || $1 || '%'
    )
  ORDER BY fecha_crear DESC;
`;

export const updateAdm = `UPDATE Administrativo SET cargo = $1 WHERE id_administrativo = $2 RETURNING *`;

export const getSingleAdmForUpdate = `SELECT 
    p.nombre AS nombre,
    p.ap_paterno AS apPaterno,
    p.ap_materno AS apMaterno,
    p.telefono AS telefono,
    p.correo AS correo,
    p.carnet AS carnet,
    p.fecha_nacimiento AS fechaNacimiento,
    a.cargo AS cargo 
FROM 
    Personas p
JOIN 
    Administrativo a 
ON 
    p.id_persona = a.id_administrativo
JOIN
    Personal pers
ON
    pers.id_personal = a.id_administrativo
WHERE 
    p.id_persona = $1 
AND 
    pers.fecha_fin IS NULL;`;

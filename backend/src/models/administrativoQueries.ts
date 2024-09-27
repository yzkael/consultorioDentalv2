export const crearAdministrativoQuery = `INSERT INTO Administrativo(id_administrativo, cargo) VALUES ($1, $2) RETURNING *`;

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
  JOIN Administrativo adm ON adm.id_adminsitrativo = personal.id_personal
  JOIN Cargos cargo ON cargo.id_especialidad = adm.cargo
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
JOIN Personal personal ON personal.id_persona = persona.id_persona 
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
JOIN Personal personal ON personal.id_persona = persona.id_persona 
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
JOIN Personal personal ON personal.id_persona = persona.id_persona 
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

export const crearPacienteQuery = `INSERT INTO Pacientes(id_paciente, creado_por) VALUES ($1, $2) RETURNING *`;

export const getAllPacientesQuery = `SELECT 
    p.id_persona,
    p.nombre,
    p.ap_paterno AS apPaterno, 
    p.ap_materno AS apMaterno, 
    p.carnet, 
    p.telefono 
FROM 
    Personas p 
JOIN 
    Pacientes pac ON p.id_persona = pac.id_paciente 
WHERE pac.is_active;`;

//Tal vez necesite Trimmearlo para el Details Paciente y el Update Paciente
export const getSinglePaciente = `SELECT * FROM Pacientes WHERE id_paciente = $1`;

export const softDeletePacienteQuery = `
UPDATE 
    Pacientes 
SET 
    is_active = false
WHERE
    id_paciente = $1
RETURNING *`;

export const searchPacientesDefault = `
SELECT
    p.id_persona,
    p.nombre,
    p.ap_paterno AS apPaterno,
    p.ap_materno AS apMaterno,
    p.carnet,
    p.telefono
FROM 
    Personas p 
JOIN
    Pacientes pac
ON 
    p.id_persona = pac.id_paciente
WHERE 
    pac.is_active
AND
    (
        p.nombre ILIKE '%' || $1 || '%' 
        OR
        p.ap_paterno ILIKE '%' || $1 || '%'
        OR
        p.ap_materno ILIKE '%' || $1 || '%'
        OR
        p.carnet ILIKE '%' || $1 || '%'
        OR
        p.telefono ILIKE '%' || $1 || '%'
    )`;

export const searchPacientesNombre = `
SELECT
    p.id_persona,
    p.nombre,
    p.ap_paterno AS apPaterno,
    p.ap_materno AS apMaterno,
    p.carnet,
    p.telefono 
FROM 
    Personas p 
JOIN
    Pacientes pac
ON
    p.id_persona = pac.id_paciente
WHERE
    pac.is_active
AND
    p.nombre ILIKE '%' || $1 || '%'`;

export const searchPacientesApPaterno = `
    SELECT
        p.id_persona,
        p.nombre,
        p.ap_paterno AS apPaterno,
        p.ap_materno AS apMaterno,
        p.carnet,
        p.telefono 
    FROM 
        Personas p 
    JOIN
        Pacientes pac
    ON
        p.id_persona = pac.id_paciente
    WHERE
        pac.is_active
    AND
        p.ap_paterno ILIKE '%' || $1 || '%'
 `;

export const searchPacientesApMaterno = `
    SELECT
        p.id_persona,
        p.nombre,
        p.ap_paterno AS apPaterno,
        p.ap_materno AS apMaterno,
        p.carnet,
        p.telefono 
    FROM 
        Personas p 
    JOIN
        Pacientes pac
    ON
        p.id_persona = pac.id_paciente
    WHERE
        pac.is_active
    AND
        p.ap_materno ILIKE '%' || $1 || '%'`;

export const searchPacientesCarnet = `
        SELECT
            p.id_persona,
            p.nombre,
            p.ap_paterno AS apPaterno,
            p.ap_materno AS apMaterno,
            p.carnet,
            p.telefono 
        FROM 
            Personas p 
        JOIN
            Pacientes pac
        ON
            p.id_persona = pac.id_paciente
        WHERE
            pac.is_active
        AND
            p.carnet ILIKE '%' || $1 || '%'   `;

export const searchPacientesTelefono = `
    SELECT
        p.id_persona,
        p.nombre,
        p.ap_paterno AS apPaterno,
        p.ap_materno AS apMaterno,
        p.carnet,
        p.telefono 
    FROM 
        Personas p 
    JOIN
        Pacientes pac
    ON
        p.id_persona = pac.id_paciente
    WHERE
        pac.is_active
    AND
        p.telefono ILIKE '%' || $1 || '%'`;

export const getSinglePacienteQuery = `
SELECT 
    p.id_persona,
    p.nombre,
    p.ap_paterno AS apPaterno,
    p.ap_materno AS apMaterno,
    p.carnet AS carnet,
    p.correo AS correo,
    p.telefono AS telefono
FROM
    Personas p 
JOIN
    Pacientes pac
ON
    p.id_persona = pac.id_paciente
WHERE   
    pac.is_active
AND
    p.id_persona = $1`;

export const updatePacienteQuery = `
UPDATE Personas
SET
    nombre = $1,
    ap_paterno = $2,
    ap_materno = $3,
    carnet = $4,
    correo = $5,
    telefono = $6
WHERE 
    id_persona = $7 RETURNING *`;

export const numeroTotalPacientesQuery = `
SELECT
    COUNT(*) AS cantidad
FROM
    Pacientes
WHERE
    is_active = true`;

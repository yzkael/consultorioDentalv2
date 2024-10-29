export const crearConsultaQuery = `
INSERT INTO 
    Consultas
    (paciente,creado_por, fecha_designada,hora_designada,dentista) 
VALUES
    ($1,$2,$3,$4,$5)
RETURNING *`;

export const getHorariosDisponiblesQuery = `
SELECT
    h.id_horario,
    h.hora 
FROM 
    Horarios h
LEFT JOIN
    Consultas c
ON
    h.id_horario = c.hora_designada
    AND c.fecha_designada = $1
    AND c.dentista = $2
WHERE
    c.hora_designada IS NULL`;

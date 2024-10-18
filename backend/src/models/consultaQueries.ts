export const crearConsultaQuery = `
INSERT INTO 
    Consultas
    (paciente,creado_por, fecha_designada,hora_designada,dentista) 
VALUES
    ($1,$2,$3,$4,$5)
RETURNING *`;

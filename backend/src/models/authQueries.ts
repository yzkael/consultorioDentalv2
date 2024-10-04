export const checkAdministrativo = `SELECT a.id_administrativo, a.cargo, p.username FROM Administrativo a JOIN Personal p ON a.id_administrativo = p.id_personal WHERE a.id_administrativo = $1 AND p.fecha_fin IS NULL`;

export const checkDentista = `SELECT d.id_dentista, d.especialidad, p.username FROM Dentistas d JOIN Personal p ON d.id_dentista = p.id_personal WHERE d.id_dentista = $1 AND p.fecha_fin IS NULL`;

export const revisarExistenciaPersona = `SELECT carnet, correo FROM Personas WHERE carnet = $1 OR correo = $2`;

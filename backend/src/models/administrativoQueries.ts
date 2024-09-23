export const crearAdministrativo = `INSERT INTO Administrativo(id_administrativo, cargo) VALUES ($1, $2) RETURNING *`;

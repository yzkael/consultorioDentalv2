export const crearPacienteQuery = `INSERT INTO Pacientes(id_paciente, creado_por) VALUES ($1, $2) RETURNING *`;

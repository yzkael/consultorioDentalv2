import { Request, Response } from "express";
import pool from "../models/DBconnection";
import { crearPersona, revisarCarnet } from "../models/Queries";
import { revisarExistenciaPersona } from "../models/authQueries";
import { crearPacienteQuery } from "../models/pacienteQueries";

export const crearPaciente = async (req: Request, res: Response) => {
  //El valor de creado_por vendra en el req.userInfo
  const {
    nombre,
    apPaterno,
    apMaterno,
    carnet,
    correo,
    telefono,
    fechaNacimiento,
  } = req.body;
  console.log(req.body);
  const client = await pool.connect(); //Inicia la conexion
  try {
    client.query("BEGIN"); //Inicia la transaccion
    const yaExistePersona = await client.query(revisarExistenciaPersona, [
      carnet,
      correo,
    ]);
    if (yaExistePersona.rows.length != 0) {
      return res.status(400).json({ message: "Datos Invalidos" });
    }
    const nuevaPersona = await client.query(crearPersona, [
      nombre,
      apPaterno,
      apMaterno,
      carnet,
      correo,
      telefono,
      fechaNacimiento,
    ]);
    if (nuevaPersona.rows.length == 0) {
      return res.status(400).json({ message: "Datos Invalidos" });
    }
    const nuevoPaciente = await client.query(crearPacienteQuery, [
      nuevaPersona.rows[0].id_persona, //Id_paciente
      req.userInfo.userId, //creado_por Id
    ]);

    if (nuevoPaciente.rows.length == 0) {
      return res.status(400).json({ message: "Datos Invalidos" });
    }
    await client.query("COMMIT"); //Termina la transaccion
    res.status(200).json({ message: "Paciente creado exitosamente" });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK"); //deshace la query en caso de error
    res.status(500).json({ message: "Internal Server Error 500" });
  } finally {
    client.release(); //Deshace la conexion
  }
};

export const getAllPacientes = async () => {};

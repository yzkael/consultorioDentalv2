import { Request, Response } from "express";
import pool from "../models/DBconnection";
import { PoolClient } from "pg";
import {
  yaExisteEmpleado,
  crearPersona,
  crearPersonal,
  crearDentistas,
  getAllDentistas as getAllDentistasQuery,
} from "../models/Queries";
import bcrypt from "bcrypt";

export const createDentistas = async (req: Request, res: Response) => {
  const {
    nombre,
    apPaterno,
    apMaterno,
    correo,
    carnet,
    telefono,
    fechaNacimiento,
    username,
    password,
    especialidad, //Vendra Numero Codigo de Especialidad
  } = req.body;

  const client: PoolClient = await pool.connect();
  try {
    await client.query("BEGIN"); //Inicia la transaccion

    const yaExiste = await client.query(yaExisteEmpleado, [
      correo,
      carnet,
      username,
    ]);
    const { correo_exists, carnet_exists, username_exists } = yaExiste.rows[0];

    const errores: string[] = [];
    if (correo_exists) errores.push("Ese correo ya esta siendo utilizado");
    if (carnet_exists) errores.push("Ese carnet ya esta siendo utilizado");
    if (username_exists) errores.push("Ese username ya esta siendo utilizado");

    if (errores.length > 0) {
      return res.status(400).json({ erros: errores });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevaPersona = await client.query(crearPersona, [
      nombre,
      apPaterno,
      apMaterno,
      carnet,
      correo,
      telefono,
      fechaNacimiento,
    ]);

    const nuevoPersonal = await client.query(crearPersonal, [
      nuevaPersona.rows[0].id_persona,
      username,
      hashedPassword,
    ]);

    const nuevoDentista = await client.query(crearDentistas, [
      nuevoPersonal.rows[0].id_personal,
      Number(especialidad),
    ]);

    await client.query("COMMIT"); //Completa la transaccion

    res.status(200).json({ message: "Dentista creado con exito" });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    res.status(500).json({ message: "Internal Server Error 500" });
  } finally {
    client.release();
  }
};

export const getAllDentistas = async (req: Request, res: Response) => {
  try {
    const allDentistas = await pool.query(getAllDentistasQuery);
    if (allDentistas.rows.length <= 0) {
      return res
        .status(404)
        .json({ message: "No se encontro dentistas activos" });
    }
    res.status(200).json(allDentistas.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal Error 500" });
    console.log(error);
  }
};

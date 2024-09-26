import { Request, Response } from "express";
import pool from "../models/DBconnection";
import {
  crearPersona,
  crearPersonal,
  yaExisteEmpleado,
} from "../models/Queries";
import { crearAdministrativoQuery } from "../models/administrativoQueries";
import bcrypt from "bcrypt";

export const crearAdministrativo = async (req: Request, res: Response) => {
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
    cargo, //Sera un valor numerico id_cargo
  } = req.body;
  // console.log(req.body); //Debugger
  const client = await pool.connect(); //Inicia Conexion al servidor
  try {
    await client.query("BEGIN"); //Inicia la transaccion
    const yaExiste = await client.query(yaExisteEmpleado, [
      correo,
      carnet,
      username,
    ]);
    if (yaExiste.rows.length == 0) {
      return res.status(500).json({ message: "Esos datos ya existen!" });
    }
    const crearPersonaAdm = await client.query(crearPersona, [
      nombre,
      apPaterno,
      apMaterno,
      carnet,
      correo,
      telefono,
      fechaNacimiento,
    ]);
    if (crearPersonaAdm.rows.length == 0) {
      return res
        .status(400)
        .json({ message: "Datos invalidos para creacion de adminsitrativo" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const crearPersonalAdm = await client.query(crearPersonal, [
      crearPersonaAdm.rows[0].id_persona,
      username,
      hashedPassword,
    ]);
    if (crearPersonalAdm.rows.length == 0) {
      return res.status(400).json({
        message: "Datos invalidos para creacion de personal administrativo",
      });
    }
    const crearAdministrativoFunct = await client.query(
      crearAdministrativoQuery,
      [crearPersonaAdm.rows[0].id_persona, cargo]
    );
    if (crearAdministrativoFunct.rows.length == 0) {
      return res
        .status(400)
        .json({ message: "Datos invalidos para creacion de administrativo" });
    }

    await client.query("COMMIT"); //Termina la transaccion
    res.status(200).json({ message: "Administrativo creado exitosamente" });
  } catch (error) {
    await client.query("ROLLBACK"); //Cancela la transaccion
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  } finally {
    client.release(); //libera la conexion de la DB
  }
};

export const searchAdministrativo = async (req: Request, res: Response) => {
  const { searchValue, searchParamsValue } = req.body;
  const client = await pool.connect(); //Inicia la conexion
  try {
    await client.query("BEGIN"); //inicia la transaccion
    const searchParams = checkParamsValues(searchParamsValue);
  } catch (error) {}
};

const checkParamsValues = (searchParamsValues: string) => {
  switch (searchParamsValues) {
    case "-- buscar --":
      return "Hello";
  }
};

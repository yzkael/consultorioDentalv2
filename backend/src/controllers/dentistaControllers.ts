import { Request, Response } from "express";
import pool from "../models/DBconnection";
import { PoolClient } from "pg";
import {
  yaExisteEmpleado,
  crearPersona,
  crearPersonal,
  crearDentistas,
  getAllDentistas as getAllDentistasQuery,
  updatePersona,
  updatePersonal,
  updateDentista,
  getDentistaData,
  checkActive,
} from "../models/Queries";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const createDentistas = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
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
      return res.status(400).json({ errors: errores });
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

//La softDelete se maneja por medio de la inhabilitacion de la propiedad fecha_fin en la tabla personal
export const softDeleteDentista = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const client: PoolClient = await pool.connect();
  try {
    await client.query("BEGIN");
    const yaExiste = await client.query(
      "SELECT * FROM Personas WHERE id_persona = $1",
      [id]
    );
    if (yaExiste.rows.length == 0) {
      return res.status(404).json({ message: "Ese empleado no existe" });
    }
    const fechaActual = new Date().toLocaleDateString("en-CA");
    const eliminarDentista = await client.query(
      `UPDATE Personal SET fecha_fin = $1 WHERE id_personal = $2 RETURNING *`,
      [fechaActual, id]
    );
    if (!eliminarDentista.rows.length) {
      return res
        .status(500)
        .json({ message: "Something went wrong... Please try again later" });
    }
    res.status(200).json({ message: "Dentista eliminado con exito!" });
    await client.query("COMMIT");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error 500" });
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
};

export const updateDentistas = async (req: Request, res: Response) => {
  //Id del dentista
  const idDentista = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const {
    nombre,
    appaterno,
    apmaterno,
    correo,
    carnet,
    telefono,
    fechanacimiento,
    especialidad, //Vendra Numero Codigo de Especialidad
  } = req.body;
  const client: PoolClient = await pool.connect(); //Crear la conexion para poder hacer transacciones
  try {
    await client.query("BEGIN"); //Inicia la transaccion
    const existeDentista = await client.query("SELECT nombre FROM Personas");
    if (existeDentista.rows.length == 0) {
      return res.status(404).json({ message: "Ese usuario no existe!" });
    }
    const queryUpdatePersona = await client.query(updatePersona, [
      nombre,
      appaterno,
      apmaterno,
      carnet,
      correo,
      telefono,
      fechanacimiento,
      idDentista,
    ]);

    const queryUpdateDentista = await client.query(updateDentista, [
      especialidad,
      queryUpdatePersona.rows[0].id_persona,
    ]);
    await client.query("COMMIT"); //Termina la transaccion
    res.status(200).json({ message: "Dentista Updated Succesfully!" });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK"); //Reinicia la transaccion y deshace los cambios
    res.status(500).json({ message: "Internal Server Error 500" });
  } finally {
    client.release(); //Deshace la conexion
  }
};

export const getDentista = async (req: Request, res: Response) => {
  const idDentista = req.params.id;
  try {
    const dentista = await pool.query(getDentistaData, [idDentista]);
    if (dentista.rows.length == 0) {
      return res.status(404).json({ message: "Dentista Not Found" });
    }
    const checkIfInactive = await pool.query(checkActive, [idDentista]);
    if (checkIfInactive.rows[0].fecha_fin != null) {
      return res.status(404).json({ message: "Dentista Not Active" });
    }
    //Al ser llevados directamente desde Postgress No distingue minusculas y mayusculas tomar en cuenta para trabajar con frontend
    res.status(200).json(dentista.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

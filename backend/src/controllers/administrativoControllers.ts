import { Request, Response } from "express";
import pool from "../models/DBconnection";
import {
  crearPersona,
  crearPersonal,
  updatePersona,
  yaExisteEmpleado,
} from "../models/Queries";
import {
  crearAdministrativoQuery,
  getSingleAdmForUpdate,
  updateAdm,
} from "../models/administrativoQueries";
import bcrypt from "bcrypt";
import { identificarSearchAdm } from "../utils/searchQueryFunct";

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

//--------------TODO: Anhadir un LIMIT a la query para que no sobrecarge el frontend
export const searchAdministrativo = async (req: Request, res: Response) => {
  const { searchValue, searchParams } = req.body;
  if (searchParams == "")
    return res.status(400).json({ message: "No search params" });
  const client = await pool.connect(); //Inicia la conexion
  try {
    await client.query("BEGIN"); //inicia la transaccion
    const searchParamsValue = identificarSearchAdm(searchParams);
    const searchResult = await client.query(searchParamsValue, [searchValue]);
    if (searchResult.rows.length == 0) {
      return res.status(404).json({ message: "Not Result Founds" });
    }
    await client.query("COMMIT"); //fINALIZA LA TRANSACCION
    res.status(200).json(searchResult.rows);
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK"); //reinicia la transaccion
    res.status(500).json({ message: "Internal Server Error 500" });
  } finally {
    client.release(); //Deshace la conexion
  }
};

export const updateAdministrativo = async (req: Request, res: Response) => {
  const {
    nombre,
    appaterno,
    apmaterno,
    correo,
    carnet,
    telefono,
    fechanacimiento,
    cargo, //Number value of the Cargos Table
  } = req.body;
  const idAdm = req.params.id;
  const client = await pool.connect(); //Inicia la conexion
  try {
    await client.query("BEGIN"); //Inicia la transaccion
    const cambiarPersona = await client.query(updatePersona, [
      nombre,
      appaterno,
      apmaterno,
      carnet,
      correo,
      telefono,
      fechanacimiento,
      idAdm,
    ]);
    if (cambiarPersona.rows.length === 0) {
      return res.status(400).json({ message: "Invalid Data Input" });
    }
    const updatedAdmRows = await client.query(updateAdm, [cargo, idAdm]);

    if (updatedAdmRows.rows.length == 0) {
      return res.status(400).json({ message: "Invalid Data Input" });
    }
    await client.query("COMMIT"); //Finaliza Exitosamente la transaccion
    res.status(200).json({ message: "Updated Succesfully" });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK"); //Deshace la transaccion
    res.status(500).json({ message: "Internal Server Error 500" });
  } finally {
    client.release(); //Deshace la conexion
  }
};

export const softDelete = async (req: Request, res: Response) => {
  const idAdm = req.params.id;
  const client = await pool.connect(); //Inicia la conexion
  try {
    const existeAdm = await client.query(
      "SELECT * FROM Personal WHERE id_personal = $1",
      [idAdm]
    );
    if (existeAdm.rows.length == 0) {
      return res.status(404).json({ message: "Empleado Not Found" });
    }
    const fechaActual = new Date().toLocaleDateString("en-CA");
    const softDeleteAdm = await client.query(
      "UPDATE Personal SET fecha_fin = $1 WHERE id_personal = $2 RETURNING *",
      [fechaActual, idAdm]
    );
    if (softDeleteAdm.rows.length == 0) {
      return res
        .status(400)
        .json({ message: "Something went wrong while deleting" });
    }
    await client.query("COMMIT"); // Termina la transaccion
    res.status(200).json({ message: "Deleted Succesfully" });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK"); // Deshace la transaccion
    res.status(500).json({ message: "Internal Server Error 500" });
  } finally {
    client.release(); //Deshace la conexion
  }
};

export const getSingleAdm = async (req: Request, res: Response) => {
  const idAdm = req.params.id;
  const client = await pool.connect(); //Connecta a la DB
  try {
    const singleAdm = await client.query(getSingleAdmForUpdate, [idAdm]);
    if (singleAdm.rows.length == 0) {
      return res.status(404).json({ message: "Empleado not found" });
    }
    res.status(200).json(singleAdm.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  } finally {
    client.release(); // Se desconecta a la DB
  }
};

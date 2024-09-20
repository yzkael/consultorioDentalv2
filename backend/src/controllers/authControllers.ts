import { Request, Response } from "express";
import pool from "../models/DBconnection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//TODO: Terminar de implementar el JWT
export const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN"); //Comienza la transaccion

    const usuarioValido = await client.query(
      "SELECT * from Personal WHERE username = $1",
      [username]
    );
    if (usuarioValido.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Usuario o contrasenha invalida" });
    }
    const checkContrasenha = await bcrypt.compare(
      password,
      usuarioValido.rows[0].password
    );
    if (!checkContrasenha) {
      return res
        .status(400)
        .json({ message: "Usuario o contrasenha Invalido" });
    }

    //Revisar si es Administrativo o dentista
    let tipoEmpleado;
    tipoEmpleado = await client.query(
      "SELECT * FROM Administrativo WHERE id_administrativo = $1",
      [usuarioValido.rows[0].id_personal]
    );
    //Si es 0 significa que es Dentista
    if (tipoEmpleado.rows[0].length === 0) {
      tipoEmpleado = await client.query(
        "SELECT * FROM Dentistas WHERE id_dentista = $1",
        [usuarioValido.rows[0].id_personal]
      );
    }
    //Web Tokens para la autenticacion y autorizacion
  } catch (error) {}
};

export const checkCarnet = async (req: Request, res: Response) => {
  const { carnet } = req.body;
  console.log(carnet);
  try {
    const yaExiste = await pool.query(
      "SELECT * FROM Personas WHERE carnet = $1",
      [carnet]
    );
    if (yaExiste.rows.length != 0) {
      console.log("It checked");
      return res.status(400).json({ result: "ya existe" });
    }
    return res.status(200).json({ message: "disponible" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: "Internal Server Error 500" });
  }
};

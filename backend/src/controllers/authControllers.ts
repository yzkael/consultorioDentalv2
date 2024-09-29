import { Request, Response } from "express";
import pool from "../models/DBconnection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  revisarCarnet,
  revisarCorreo,
  revisarUsername,
} from "../models/Queries";
import { checkAdministrativo, checkDentista } from "../models/authQueries";

//TODO: Terminar de implementar el JWT
export const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); //Comienza la transaccion

    const usuarioValido = await client.query(
      "SELECT * from Personal WHERE username = $1 AND fecha_fin IS NULL",
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
    let empleadoData;
    let tipoEmpleado = "administrativo";
    empleadoData = await client.query(checkAdministrativo, [
      usuarioValido.rows[0].id_personal,
    ]);

    //Si es 0 significa que es Dentista
    if (empleadoData.rows.length == 0) {
      empleadoData = await client.query(checkDentista, [
        usuarioValido.rows[0].id_personal,
      ]);
      tipoEmpleado = "dentista";
    }
    const userData = empleadoData.rows[0];

    //--------------IMPORTANTE -------------
    // utilice role como nombre generico para facilitarme su uso en el frontend
    let token;

    if (tipoEmpleado == "administrativo") {
      token = jwt.sign(
        {
          userId: userData.id_administrativo,
          username: userData.username,
          role: userData.cargo,
          tipoEmpleado: tipoEmpleado,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
    } else {
      token = jwt.sign(
        {
          userId: userData.id_dentista,
          username: userData.username,
          role: userData.especialidad,
          tipoEmpleado: tipoEmpleado,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
    }
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false, //Por que es development
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

export const checkCarnet = async (req: Request, res: Response) => {
  const { carnet } = req.body;
  try {
    const yaExiste = await pool.query(revisarCarnet, [carnet]);
    if (yaExiste.rows.length != 0) {
      return res.status(400).json({ result: "ya existe" });
    }
    return res.status(200).json({ message: "disponible" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: "Internal Server Error 500" });
  }
};

export const checkCorreo = async (req: Request, res: Response) => {
  const { correo } = req.body;
  try {
    const yaExiste = await pool.query(revisarCorreo, [correo]);
    if (yaExiste.rows.length != 0) {
      return res.status(400).json({ message: "Ese correo ya existe" });
    }

    res.status(200).json({ message: "Correo valido" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

export const checkUsername = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const yaExiste = await pool.query(revisarUsername, [username]);
    if (yaExiste.rows.length != 0) {
      return res.status(400).json({ message: "Username ya existe" });
    }

    res.status(200).json({ message: "Disponible" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

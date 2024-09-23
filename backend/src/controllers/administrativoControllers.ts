import { Request, Response } from "express";
import pool from "../models/DBconnection";
import { yaExisteEmpleado } from "../models/Queries";

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
    const yaExiste = await client.query(yaExisteEmpleado);
  } catch (error) {}
};

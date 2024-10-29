import { Request, Response } from "express";
import pool from "../models/DBconnection";
import {
  crearConsultaQuery,
  getHorariosDisponiblesQuery,
} from "../models/consultaQueries";

export const createConsulta = async (req: Request, res: Response) => {
  const idAdm = req.userInfo.userId;
  const { idPaciente, fechaDesignada, idHora, idDentista } = req.body;
  console.log(req.body, idAdm, "REACHED");
  try {
    const nuevaConsulta = await pool.query(crearConsultaQuery, [
      idPaciente,
      idAdm, //Esto vendra del JWT Middleware
      fechaDesignada,
      idHora,
      idDentista,
    ]);
    if (nuevaConsulta.rows.length == 0) {
      return res.status(400).json({ message: "Invalid Data" });
    }
    res.status(200).json({ message: "Consulta Creada Exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

export const getAllConsultas = async (req: Request, res: Response) => {
  try {
    const allConsultas = await pool.query("SELECT * FROM consultas");
    if (allConsultas.rows.length == 0) {
      return res.status(404).json({ message: "No hay consultas para mostrar" });
    }
    res.status(200).json(allConsultas.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

export const getHorariosDisponibles = async (req: Request, res: Response) => {
  const { fecha, medico } = req.body;
  try {
    const horariosDisponibles = await pool.query(getHorariosDisponiblesQuery, [
      fecha,
      medico,
    ]);
    if (horariosDisponibles.rows.length == 0) {
      return res
        .status(404)
        .json({ message: "No existen horarios disponibles" });
    }
    res.status(200).json(horariosDisponibles.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

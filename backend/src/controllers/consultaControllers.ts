import { Request, Response } from "express";
import pool from "../models/DBconnection";
import { crearConsultaQuery } from "../models/consultaQueries";

export const createConsulta = async (req: Request, res: Response) => {
  const idAdm = req.userInfo.userId;
  const { idPaciente, fechaDesignada, idHora, idDentista } = req.body;
  try {
    const nuevaConsulta = await pool.query(crearConsultaQuery, [
      idPaciente,
      idAdm,
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

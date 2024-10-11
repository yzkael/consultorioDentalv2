import { Request, Response } from "express";
import pool from "../models/DBconnection";
import { crearPersona, revisarCarnet } from "../models/Queries";
import { revisarExistenciaPersona } from "../models/authQueries";
import {
  crearPacienteQuery,
  getSinglePacienteQuery,
  getAllPacientesQuery,
  getSinglePaciente,
  searchPacientesApMaterno,
  searchPacientesApPaterno,
  searchPacientesCarnet,
  searchPacientesDefault,
  searchPacientesNombre,
  searchPacientesTelefono,
  updatePacienteQuery,
  softDeletePacienteQuery,
} from "../models/pacienteQueries";

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

//Para mostrar en tabla Frontend (No devuelve todos los datos)
export const getAllPacientes = async (req: Request, res: Response) => {
  try {
    const allPacientes = await pool.query(getAllPacientesQuery);
    if (allPacientes.rows.length == 0) {
      return res.status(404).json({ message: "No Pacientes Found" });
    }
    res.status(200).json(allPacientes.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

// Para el Frontend (No devuelve todos los datos)

export const searchPacientes = async (req: Request, res: Response) => {
  const { searchValue, searchParams } = req.body;

  const searchQuery = identifySearchQuery(searchParams);
  const client = await pool.connect(); //Conecta a la DB
  try {
    await client.query("BEGIN"); //Inicia la transaccion
    const searchResult = await client.query(searchQuery, [searchValue]);
    if (searchResult.rows.length == 0) {
      return res.status(404).json({ message: "No Pacientes Found" });
    }
    await client.query("COMMIT");
    res.status(200).json(searchResult.rows);
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    res.status(500).json({ message: "Internal Server Error 500" });
  } finally {
    client.release();
  }
};

export const softDeletePaciente = async (req: Request, res: Response) => {
  const idPaciente = req.params.id;
  const client = await pool.connect(); //Inicia Conexion
  try {
    await client.query("BEGIN"); //Inicia Transaccion
    const existePaciente = await client.query(getSinglePaciente, [idPaciente]);
    if (existePaciente.rows.length == 0) {
      return res.status(404).json({ message: "Paciente Not Found" });
    }
    //Falta la Query que enserio lo eliminara
    const pacienteEliminado = await client.query(softDeletePacienteQuery, [
      idPaciente,
    ]);
    if (pacienteEliminado.rows.length == 0) {
      return res.status(500).json({ message: "Internal Server Error 500" });
    }
    await client.query("COMMIT"); //Termina la Transaccion
    res.status(200).json({ message: "Paciente Eliminado Exitosamente" });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK"); //Deshace la query
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    client.release();
  }
};

const identifySearchQuery = (searchParams: string) => {
  //Debo crear las queries para el buscador
  switch (searchParams) {
    case "-buscar-":
      return searchPacientesDefault;
    case "nombre":
      return searchPacientesNombre;
    case "appaterno":
      return searchPacientesApPaterno;
    case "apmaterno":
      return searchPacientesApMaterno;
    case "carnet":
      return searchPacientesCarnet;
    case "telefono":
      return searchPacientesTelefono;
    default:
      return searchPacientesDefault;
  }
};

export const fetchSinglePaciente = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const singlePaciente = await pool.query(getSinglePacienteQuery, [id]);
    if (singlePaciente.rows.length == 0) {
      return res.status(404).json({ message: "No paciente found" });
    }
    res.status(200).json(singlePaciente.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

export const updatePaciente = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { nombre, appaterno, apmaterno, carnet, correo, telefono } = req.body;
  const client = await pool.connect(); //Inicia la conexion
  try {
    await client.query("BEGIN"); //Inicia la transaccion
    const singlePaciente = await client.query(getSinglePacienteQuery, [id]);
    if (singlePaciente.rows.length == 0) {
      return res.status(404).json({ message: "Paciente Not Found" });
    }
    const updatedPaciente = await client.query(updatePacienteQuery, [
      nombre,
      appaterno,
      apmaterno,
      carnet,
      correo,
      telefono,
      id,
    ]);
    if (updatedPaciente.rows.length == 0) {
      return res.status(400).json({ message: "Invalid Data Format" });
    }
    await client.query("COMMIT"); //Termina la transaccion
    res.status(200).json({ message: "Paciente Actualizado Exitosamente" });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK"); //Deshace la transaccion en caso de error
    res.status(500).json({ message: "Internal Server Error 500" });
  } finally {
    client.release();
  }
};

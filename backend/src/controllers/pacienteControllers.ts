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
  numeroTotalPacientesQuery,
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

// Anhadir Paginacion

/*
          Funciona en el API TESTER
  Es muy probable que necesite reestructurar mi frontend para emplear la
  Pagination... Necesito
      1ro.- Ver como enviar Queries en el URL sin cagar la search
          Ideas: Podria enviarlo con un fetch todo chuto y cagarme ne la tapa 
          dejando que React se encarge de actualizar la imagen
      2do.- Cambiar el Frontend para que entre el boton que se encargara de ello
              OJO: La funcion  getTotalPacienteNumber fue creada para sacar el numero total de 
                    Pacientes Activos y asi poder generar los numeros por si solos
                    Tambien me interesa muchisimo Resolver el problema de como podriamos cambiar
                    del 1 hasta el 10 y que los botones se vayan cambiando..
                    Es decir: Que cuando este en el numero por ejemplo: 15
                    los numeros visibles sean del 5 al 25
      3ro.- Necesitare una forma de sacar el numero total de Resultados posibles en Cada Search para 
      poder rearmar el tamanho o la cantidad de numeros para la pagination
*/

export const getTotalPacienteNumber = async (req: Request, res: Response) => {
  try {
    const numeroTotal = await pool.query(numeroTotalPacientesQuery);
    if (numeroTotal.rows.length == 0) {
      return res
        .status(404)
        .json({ message: "No existen pacientes registrados" });
    }
    res.status(200).json(numeroTotal.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};
//BUSQUEDA SIMPLONA
export const SearchPacientesNoPagination = async (
  req: Request,
  res: Response
) => {
  const { searchValue, searchParams } = req.body;
  const searchQuery = identifySearchQuery(searchParams);
  try {
    const searchResult = await pool.query(searchQuery, [searchValue]);
    if (searchResult.rows.length == 0) {
      return res.status(404).json({ message: "No existen pacientes" });
    }
    // Wrappeado en un objeto data: para poder ser manejado por el frontend
    res.status(200).json({ data: searchResult.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

//BUSQUEDA CON PAGINACION
export const searchPacientes = async (req: Request, res: Response) => {
  const { searchValue, searchParams } = req.body;
  const searchQuery = identifySearchQuery(searchParams);
  const client = await pool.connect(); //Conecta a la DB

  const paginaActual = req.query.page ? Number(req.query.page) : 1;
  const maximoDatos = 10; //Valor Hardcoded que delimita el numero de datos devueltos
  const rangoMinDatos = (paginaActual - 1) * maximoDatos;
  const rangoMaxDatos = paginaActual * maximoDatos;

  try {
    await client.query("BEGIN"); //Inicia la transaccion

    const searchResult = await client.query(searchQuery, [searchValue]);
    if (searchResult.rows.length == 0) {
      return res.status(404).json({ message: "No Pacientes Found" });
    }
    await client.query("COMMIT");
    res.status(200).json({
      data: searchResult.rows.slice(rangoMinDatos, rangoMaxDatos),
      total: searchResult.rows.length,
      limite: maximoDatos,
    });
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

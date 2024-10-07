import express from "express";
import {
  crearPaciente,
  getAllPacientes,
  searchPacientes,
} from "../controllers/pacienteControllers";
import revisarAdm from "../middlewares/checkAdm";
import { revisarJWT } from "../middlewares/revisarJWT";

const router = express.Router();

router.get("/", getAllPacientes);

router.post("/", revisarAdm, revisarJWT, crearPaciente);

router.post("/search", searchPacientes);

export default router;

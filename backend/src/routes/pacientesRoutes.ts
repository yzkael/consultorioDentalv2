import express from "express";
import {
  crearPaciente,
  fetchSinglePaciente,
  getAllPacientes,
  getTotalPacienteNumber,
  searchPacientes,
  softDeletePaciente,
  updatePaciente,
} from "../controllers/pacienteControllers";
import revisarAdm from "../middlewares/checkAdm";
import { revisarJWT } from "../middlewares/revisarJWT";

const router = express.Router();

router.get("/", getAllPacientes);

router.get("/total", getTotalPacienteNumber);

router.get("/:id", fetchSinglePaciente);

router.post("/update/:id", updatePaciente);

router.post("/", revisarAdm, revisarJWT, crearPaciente);

router.post("/search/", searchPacientes);

router.delete("/:id", softDeletePaciente);

export default router;

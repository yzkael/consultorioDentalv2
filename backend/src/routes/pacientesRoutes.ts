import express from "express";
import {
  crearPaciente,
  fetchSinglePaciente,
  getAllPacientes,
  searchPacientes,
  updatePaciente,
} from "../controllers/pacienteControllers";
import revisarAdm from "../middlewares/checkAdm";
import { revisarJWT } from "../middlewares/revisarJWT";

const router = express.Router();

router.get("/", getAllPacientes);

router.get("/:id", fetchSinglePaciente);

router.post("/update/:id", updatePaciente);

router.post("/", revisarAdm, revisarJWT, crearPaciente);

router.post("/search", searchPacientes);

export default router;

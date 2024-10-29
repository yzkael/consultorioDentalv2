import express from "express";
import {
  createConsulta,
  getAllConsultas,
  getHorariosDisponibles,
} from "../controllers/consultaControllers";
import revisarAdm from "../middlewares/checkAdm";
import { revisarJWT } from "../middlewares/revisarJWT";

const router = express.Router();

router.get("/", getAllConsultas);

router.post("/", revisarAdm, revisarJWT, createConsulta);

router.post("/horarios", getHorariosDisponibles);

export default router;

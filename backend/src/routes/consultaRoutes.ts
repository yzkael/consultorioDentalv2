import express from "express";
import {
  createConsulta,
  getAllConsultas,
} from "../controllers/consultaControllers";
import revisarAdm from "../middlewares/checkAdm";
import { revisarJWT } from "../middlewares/revisarJWT";

const router = express.Router();

router.get("/", getAllConsultas);

router.post("/", revisarJWT, revisarAdm, createConsulta);

export default router;

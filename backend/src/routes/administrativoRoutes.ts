import express from "express";
import { crearAdministrativo } from "../controllers/administrativoControllers";

const router = express.Router();

router.post("/", crearAdministrativo);

export default router;

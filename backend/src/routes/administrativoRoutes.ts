import express from "express";
import {
  crearAdministrativo,
  searchAdministrativo,
  updateAdministrativo,
} from "../controllers/administrativoControllers";

const router = express.Router();

router.post("/", crearAdministrativo);

router.post("/search", searchAdministrativo);

router.put("/:id", updateAdministrativo);

export default router;

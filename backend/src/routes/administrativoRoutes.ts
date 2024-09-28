import express from "express";
import {
  crearAdministrativo,
  getSingleAdm,
  searchAdministrativo,
  softDelete,
  updateAdministrativo,
} from "../controllers/administrativoControllers";

const router = express.Router();

router.post("/", crearAdministrativo);

router.post("/search", searchAdministrativo);

router.put("/:id", updateAdministrativo);

router.put("/delete/:id", softDelete);

router.get("/:id", getSingleAdm);

export default router;

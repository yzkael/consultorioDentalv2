import express from "express";
import {
  createDentistas,
  getAllDentistas,
  softDeleteDentista,
  updateDentistas,
} from "../controllers/dentistaControllers";

const router = express.Router();

router.post("/", createDentistas);

router.get("/", getAllDentistas);

router.delete("/:id", softDeleteDentista);

router.put("/:id", updateDentistas);

export default router;

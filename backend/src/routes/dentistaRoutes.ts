import express from "express";
import {
  createDentistas,
  getAllDentistas,
  softDeleteDentista,
} from "../controllers/dentistaControllers";

const router = express.Router();

router.post("/", createDentistas);

router.get("/", getAllDentistas);

router.delete("/:id", softDeleteDentista);

export default router;

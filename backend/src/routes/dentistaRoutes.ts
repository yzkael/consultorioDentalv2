import express from "express";
import {
  createDentistas,
  getAllDentistas,
} from "../controllers/dentistaControllers";

const router = express.Router();

router.post("/", createDentistas);

router.get("/", getAllDentistas);

export default router;

import express from "express";
import { createDentistas } from "../controllers/dentistaControllers";

const router = express.Router();

router.post("/", createDentistas);

export default router;

import express from "express";
import { checkCarnet } from "../controllers/authControllers";

const router = express.Router();

router.post("/check-carnet", checkCarnet);

export default router;

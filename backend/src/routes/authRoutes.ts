import express from "express";
import { checkCarnet, checkCorreo } from "../controllers/authControllers";

const router = express.Router();

router.post("/check-carnet", checkCarnet);

router.post("/check-correo", checkCorreo);

export default router;

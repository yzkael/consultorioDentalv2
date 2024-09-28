import express from "express";
import {
  checkCarnet,
  checkCorreo,
  checkUsername,
  signUp,
} from "../controllers/authControllers";

const router = express.Router();

router.post("/login", signUp);

router.post("/check-carnet", checkCarnet);

router.post("/check-correo", checkCorreo);

router.post("/check-username", checkUsername);

export default router;

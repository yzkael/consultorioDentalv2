import express, { Request, Response } from "express";
import {
  checkCarnet,
  checkCorreo,
  checkUsername,
  signUp,
} from "../controllers/authControllers";
import { revisarJWT } from "../middlewares/revisarJWT";

const router = express.Router();

router.post("/login", signUp);

router.post("/check-carnet", checkCarnet);

router.post("/check-correo", checkCorreo);

router.post("/check-username", checkUsername);

router.get("/check-jwt", revisarJWT, async (req: Request, res: Response) => {
  res.status(200).json(req.tipoEmpleado);
});

export default router;

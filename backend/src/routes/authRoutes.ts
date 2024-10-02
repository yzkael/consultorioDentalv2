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
  res.status(200).json(req.userInfo);
});

router.post("/logout", async (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

//Aqui vendran las routes que revisaran el role del usuario dependiendo de su numero en role:
//esto se utilizara para proteger las rutas

export default router;

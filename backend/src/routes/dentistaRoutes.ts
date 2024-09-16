import express from "express";
import { body } from "express-validator";
import {
  createDentistas,
  getAllDentistas,
  getDentista,
  softDeleteDentista,
  updateDentistas,
} from "../controllers/dentistaControllers";

const router = express.Router();

router.post(
  "/",
  [
    body("nombre").notEmpty().withMessage("Los nombres son requeridos"),
    body("apPaterno").notEmpty().withMessage("Ambos apellidos son necesarios"),
    body("apMaterno").notEmpty().withMessage("Ambos apellidos son necesarios"),
    body("correo")
      .isEmail()
      .notEmpty()
      .withMessage("Un correo valido es necesario"),
    body("telefono").notEmpty().withMessage("El telefono es un dato necesario"),
    body("fechaNacimiento")
      .notEmpty()
      .withMessage("Es necesaria una fecha de nacimiento"),
    body("password")
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("La contrasenha debe ser de al menos 6 caracteres"),
    body("especialidad")
      .isNumeric()
      .notEmpty()
      .withMessage("Error al registrar Especialidad. Por Intentelo mas tarde"),
  ],
  createDentistas
);

router.get("/", getAllDentistas);

router.delete("/:id", softDeleteDentista);

router.put(
  "/:id",
  [
    body("nombre").notEmpty().withMessage("El nombre no puede estar vacio!"),
    body("appaterno")
      .notEmpty()
      .withMessage("Los apellidos no pueden estar vacios!"),
    body("apmaterno")
      .notEmpty()
      .withMessage("Los apellidos no pueden estar vacios!"),
    body("correo")
      .isEmail()
      .notEmpty()
      .withMessage("El correo debe ser uno valido!"),
    body("carnet").notEmpty().withMessage("Es necesario especificar el Carnet"),
    body("telefono").notEmpty().withMessage("Es necesario un telefono!"),
    body("fechanacimiento")
      .notEmpty()
      .withMessage("La fecha de nacimiento no puede estar vacia!"),
    body("especialidad")
      .notEmpty()
      .isNumeric()
      .withMessage(
        "Error al cambiar especialidad! Por favor intentelo mas tarde."
      ),
  ],
  updateDentistas
);

router.get("/:id", getDentista);

export default router;

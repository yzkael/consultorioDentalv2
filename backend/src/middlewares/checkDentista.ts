import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const revisarDentista = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

  if ((decoded as JwtPayload).tipoEmpleado != "administrativo") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export default revisarDentista;

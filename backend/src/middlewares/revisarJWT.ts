import { Request, Response, NextFunction } from "express";
import jwt, { decode, JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userInfo: {
        userId: number;
        tipoEmpleado: string;
        role: string;
      };
    }
  }
}

export const revisarJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    //Hay que inicializarlo para que typescript no joda
    if (!req.userInfo) {
      req.userInfo = { userId: 0, tipoEmpleado: "", role: "" };
    }

    req.userInfo.userId = (decoded as JwtPayload).userId;
    req.userInfo.role = (decoded as JwtPayload).role;
    req.userInfo.tipoEmpleado = (decoded as JwtPayload).tipoEmpleado;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

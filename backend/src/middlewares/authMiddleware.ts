import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const secretKey = process.env.JWT_SECRET as string;

export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Token inválido" });
      return;
    }

    const payload = decoded as { id: string };
    req.userId = payload.id;
    next();
  });
};

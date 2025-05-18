import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password, fullName, displayName, birthday, photoUrl } =
      req.body;

    if ( 
      !email ||
      typeof email !== "string" ||
      email.trim() === "" ||
      !password ||
      typeof password !== "string" ||
      password.trim() === "" ||
      !fullName ||
      typeof fullName !== "string" ||
      fullName.trim() === '' ||
      displayName
    ) {
      return 
    }
      const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.createUser({
      email,
      password: hashedPassword,
      fullName,
      displayName,
      birthday,
      photoUrl,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      email.trim() === "" ||
      typeof password !== "string" ||
      password.trim() === ""
    ) {
      return res.status(400).json({ message: "Credenciais Inválidas" });
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Credenciais Inválidas." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Credenciais Inválidas." });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    const userResponse = {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      fullName: user.full_name,
      photoUrl: user.photo_url,
      birthday: user.birthday,
      registeredAt: user.registered_at,
      enabledAt: user.enabled_at,
    };

    return res.json({
      token,
      user: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

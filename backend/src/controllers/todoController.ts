import { NextFunction, Request, Response } from "express";

import TodoModel from "../models/Todo";

export const createTodo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {  title, description, dueDate } = req.body;

    const userId = req.userId;
    console.log(userId);
    console.log(title); 
    if (
      !userId ||
      typeof userId !== "number" ||
      !title ||
      typeof title !== "string" ||
      !description ||
      typeof description !== "string" ||
      !dueDate
    ) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }
    const newTodo = await TodoModel.createTodo({ userId, title, description, dueDate });

    return res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";

import TodoModel from "../models/Todo";
import { transform } from "typescript";

export const createTodo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { title, description, dueDate } = req.body;

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

export const getTodos = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userId = req.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const todos = await TodoModel.getTodos(userId);

    const transformedTodos = todos.map((todo)=> ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      createdAt: todo.created_at,
      updatedAt: todo.updated_at,
      dueDate: todo.due_date,
      completed: todo.completed,
    }));

    return res.json(transformedTodos);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const todoId = parseInt(req.params.id);
    const userId = req.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    if (!todoId) {
      return res.status(400).json({ message: "ID do Todo não fornecido." });
    }

    const deletedTodo = await TodoModel.deleteTodo(todoId);
    console.log(deletedTodo)

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo não encontrado." });
    }

    return res.json(deletedTodo);
  } catch (error) {
    next(error);
  }
};


export const updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {  
  try {
    const todoId = parseInt(req.params.id);
    const { title, description, dueDate, completed } = req.body;
    const userId = req.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    if (!todoId) {
      return res.status(400).json({ message: "ID do Todo não fornecido." });
    }

    const updatedTodo = await TodoModel.updateTodo({
      id: todoId,
      title,
      description,
      dueDate,
      completed,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo não encontrado." });
    }

    return res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
}
export const getTodoById = async (req: Request, res: Response, next: NextFunction): Promise<any> => { 
  try {
    const todoId = parseInt(req.params.id);
    const userId = req.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    if (!todoId) {
      return res.status(400).json({ message: "ID do Todo não fornecido." });
    }

    const todo = await TodoModel.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo não encontrado." });
    }

    return res.json(todo);
  } catch (error) {
    next(error);
  }
}
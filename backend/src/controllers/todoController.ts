import { NextFunction, Request, Response } from "express";

import TodoModel from "../models/Todo";

export const createTodo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { title, description, dueDate } = req.body;

    const userId = req.userId;
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
      list_id: todo.list_id ?? null,
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


export const associateTodoToList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const todoId = parseInt(req.params.id);
    const { listId } = req.body;

    if (!todoId || !listId) {
      return res.status(400).json({ message: "Todo ID e List ID são obrigatórios." });
    }

    const updatedTodo = await TodoModel.associateTodoToList(todoId, listId);

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo não encontrado ou associação falhou." });
    }

    return res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const disassociateTodoFromList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const todoId = parseInt(req.params.id);

    if (!todoId) {
      return res.status(400).json({ message: "Todo ID é obrigatório." });
    }

    const updatedTodo = await TodoModel.disassociateTodoFromList(todoId);

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo não encontrado." });
    }

    return res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const toggleComplete = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const todoId = parseInt(req.params.id);

    if (!todoId) {
      return res.status(400).json({ message: "Todo ID é obrigatório." });
    }

    const updatedTodo = await TodoModel.toggleComplete(todoId);

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo não encontrado." });
    }

    return res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const getTodosByList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const listId = parseInt(req.params.listId);

    if (!listId) {
      return res.status(400).json({ message: "List ID é obrigatório." });
    }

    const todos = await TodoModel.getTodosByList(listId);
    return res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const getOverdueTodos = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userId = req.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const overdueTodos = await TodoModel.getOverdueTodos(userId);
    return res.json(overdueTodos);
  } catch (error) {
    next(error);
  }
};

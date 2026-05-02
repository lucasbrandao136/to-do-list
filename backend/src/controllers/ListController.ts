import { Request, Response, NextFunction } from "express";
import ListModel from "../models/List";

export const createList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = Number(req.userId);
    const { name, title, color } = req.body;
    const listName = name || title;

    if (!userId || !listName || !color) {
      return res.status(400).json({ message: "Nome e cor são obrigatórios." });
    }

    const newList = await ListModel.createList(userId, listName, color);
    return res.status(201).json(newList);
  } catch (error) {
    next(error);
  }
};

export const updateList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const listId = parseInt(req.params.id);
    const { name, color } = req.body;

    if (!listId || !name || !color) {
      return res
        .status(400)
        .json({ message: "ID, nome e cor são obrigatórios." });
    }

    const updatedList = await ListModel.updateList(listId, name, color);

    if (!updatedList) {
      return res.status(404).json({ message: "Lista não encontrada." });
    }

    return res.json(updatedList);
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const listId = parseInt(req.params.id);

    if (!listId) {
      return res.status(400).json({ message: "ID da lista é obrigatório." });
    }

    const deleted = await ListModel.deleteList(listId);

    if (!deleted) {
      return res.status(404).json({ message: "Lista não encontrada." });
    }

    return res.json({ message: "Lista deletada com sucesso." });
  } catch (error) {
    next(error);
  }
};

export const archiveList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const listId = parseInt(req.params.id);

    if (!listId) {
      return res.status(400).json({ message: "ID da lista é obrigatório." });
    }

    const archived = await ListModel.setArchived(listId, true);

    if (!archived) {
      return res.status(404).json({ message: "Lista não encontrada." });
    }

    return res.json(archived);
  } catch (error) {
    next(error);
  }
};

export const dearchiveList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const listId = parseInt(req.params.id);

    if (!listId) {
      return res.status(400).json({ message: "ID da lista é obrigatório." });
    }

    const dearchived = await ListModel.setArchived(listId, false);

    if (!dearchived) {
      return res.status(404).json({ message: "Lista não encontrada." });
    }

    return res.json(dearchived);
  } catch (error) {
    next(error);
  }
};

export const getLists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Usuário inválido." });
    }

    const lists = await ListModel.getLists(userId);
    return res.json(lists);
  } catch (error) {
    next(error);
  }
};

export const getArchivedLists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Usuário inválido." });
    }

    const lists = await ListModel.getArchivedLists(userId);
    return res.json(lists);
  } catch (error) {
    next(error);
  }
};

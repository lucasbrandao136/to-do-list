import { Router } from "express";
import { createTodo, updateTodo, getTodoById, getTodos, deleteTodo } from "../controllers/todoController";
const router = Router();

router.post("/new/todo", createTodo);
router.get("/todos", getTodos);
router.delete("/todo/:id", deleteTodo);
router.put("/todo/:id", updateTodo);
router.get("/todo/:id", getTodoById);

export default router;

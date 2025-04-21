import { Router } from "express";
import { createTodo } from "../controllers/todoController";
const router = Router();

router.post("/new/todo", createTodo);

export default router;

import { Router } from "express";
import { createTodo,
  updateTodo,
  getTodoById,
  getTodos,
  deleteTodo,
  toggleComplete,
  associateTodoToList,
  disassociateTodoFromList,
  getTodosByList,
  getOverdueTodos, } from "../controllers/todoController";
const router = Router();

router.post("/new/todo", createTodo);
router.get("/todos", getTodos);
router.delete("/todo/:id", deleteTodo);
router.put("/todo/:id", updateTodo);
router.get("/todo/:id", getTodoById);


router.patch("/todo/:id/toggle", toggleComplete); // Alternar completo/incompleto
router.patch("/todo/:id/associate", associateTodoToList); // Associa à lista
router.patch("/todo/:id/disassociate", disassociateTodoFromList); // Remove da lista
router.get("/todos/list/:listId", getTodosByList); // Todos por lista
router.get("/todos/overdue", getOverdueTodos); // Tarefas vencidas
export default router;

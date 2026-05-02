import { Router } from "express";

import {
  createList,
  updateList,
  deleteList,
  archiveList,
  dearchiveList,
  getLists, getArchivedLists
} from "../controllers/ListController";

const router = Router();

router.post("/list", createList);
router.get("/lists", getLists);
router.get("/lists/archived", getArchivedLists);
router.put("/list/:id", updateList);
router.delete("/list/:id", deleteList);
router.patch("/list/:id/archive", archiveList);
router.patch("/list/:id/dearchive", dearchiveList);
export default router;

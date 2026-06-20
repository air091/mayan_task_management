import { Router } from "express";
import {
  deleteTask,
  endTaskController,
  getAllTask,
  getTaskById,
  postTask,
  putTask,
  searchTaskByNameController,
  startTaskController,
} from "../controllers/task.controller";

const router: Router = Router();

router.get("/search", searchTaskByNameController);
router.get("/", getAllTask);
router.get("/:taskId", getTaskById);
router.post("/", postTask);
router.put("/:taskId", putTask); // edit task

router.put("/:taskId/start", startTaskController);
router.put("/:taskId/end", endTaskController);

router.delete("/:taskId", deleteTask);

export default router;

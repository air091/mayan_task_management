import { Router } from "express";
import {
  deleteTask,
  endTaskController,
  filterTaskController,
  getTaskById,
  postTask,
  putTask,
  startTaskController,
} from "../controllers/task.controller";

const router: Router = Router();

router.get("/", filterTaskController);
router.get("/:taskId", getTaskById);

router.post("/", postTask);

router.put("/:taskId", putTask); // edit task
router.put("/:taskId/start", startTaskController);
router.put("/:taskId/end", endTaskController);

router.delete("/:taskId", deleteTask);

export default router;

import { Router } from "express";
import {
  deleteTask,
  getAllTask,
  getTaskById,
  postTask,
  putTask,
} from "../controllers/task.controller";

const router: Router = Router();

router.get("/", getAllTask);
router.get("/:taskId", getTaskById);
router.post("/", postTask);
router.put("/:taskId", putTask);
router.delete("/:taskId", deleteTask);

export default router;

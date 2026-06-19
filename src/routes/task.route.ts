import { Router } from "express";
import {
  getAllTask,
  getTaskById,
  postTask,
} from "../controllers/task.controller";

const router: Router = Router();

router.get("/", getAllTask);
router.get("/:taskId", getTaskById);
router.post("/", postTask);

export default router;

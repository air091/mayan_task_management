import { Router } from "express";
import { getTaskById, postTask } from "../controllers/task.controller";

const router: Router = Router();

router.get("/:taskId", getTaskById);
router.post("/", postTask);

export default router;

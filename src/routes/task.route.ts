import { Router } from "express";
import { postTask } from "../controllers/task.controller";

const router: Router = Router();

router.post("/", postTask);

export default router;

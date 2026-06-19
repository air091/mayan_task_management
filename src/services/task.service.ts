import { AppError } from "../libs/errors";
import { prisma } from "../libs/prisma";
import type { ICreateTask, ITask } from "../types/task.types";

export const createTask = async (taskPayload: ICreateTask): Promise<ITask> => {
  if (!taskPayload.title) throw new AppError("All fields are required", 400);

  taskPayload.title = taskPayload.title.trim();

  const task = await prisma.task.create({
    data: {
      title: taskPayload.title,
      description: taskPayload.description,
    },
  });

  return task;
};

export const findAllTasks = async (): Promise<ITask[]> => {
  const tasks = await prisma.task.findMany({});
  return tasks;
};

export const findTaskById = async (id: string): Promise<ITask> => {
  if (!id) throw new AppError("Task ID is required", 404);
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) throw new AppError("Task not found", 404);
  return task;
};

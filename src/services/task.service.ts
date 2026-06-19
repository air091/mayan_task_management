import { AppError } from "../libs/errors";
import { prisma } from "../libs/prisma";
import type { ICreateTask, ITask } from "../types/task.types";

export const addTask = async (taskPayload: ICreateTask): Promise<ITask> => {
  if (!taskPayload.title || !taskPayload.description)
    throw new AppError("All fields are required", 400);

  taskPayload.title = taskPayload.title.trim();

  const task = await prisma.task.create({
    data: {
      title: taskPayload.title,
      description: taskPayload.description,
    },
  });

  return task;
};

import { AppError } from "../libs/errors";
import { prisma } from "../libs/prisma";
import type { IDeletedTask, ITask, ITaskPayload } from "../types/task.types";

export const createTask = async (taskPayload: ITaskPayload): Promise<ITask> => {
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

export const editTask = async (
  id: string,
  taskPayload: ITaskPayload,
): Promise<ITask> => {
  if (!id) throw new AppError("Task ID is required", 400);

  if (taskPayload.title !== undefined) {
    taskPayload.title = taskPayload.title.trim();
  }

  if (taskPayload.description !== undefined) {
    taskPayload.description = taskPayload.description.trim();
  }

  const task = await prisma.task.update({
    where: { id },
    data: {
      title: taskPayload.title,
      description: taskPayload.description,
    },
  });

  if (!task) throw new AppError("Task not found", 404);

  return task;
};

export const markTask = async (id: string) => {
  if (!id) throw new AppError("Task ID is required", 400);

  const result = await prisma.$transaction(async (tx) => {
    const task = await prisma.task.findUnique({
      where: { id },
      select: { id: true, isComplete: true },
    });
    if (!task) throw new AppError("Task not found", 404);

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { isComplete: !task.isComplete },
    });

    return updatedTask;
  });

  return result;
};

export const removeTask = async (id: string): Promise<IDeletedTask> => {
  if (!id) throw new AppError("Task ID is required", 400);

  const result = await prisma.$transaction(async (tx) => {
    const task = await tx.task.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!task) throw new AppError("Task not found", 404);

    const deletedTask = await tx.task.delete({
      where: { id },
      select: { id: true, isComplete: true },
    });

    return deletedTask;
  });

  return result;
};

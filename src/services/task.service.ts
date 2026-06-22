import type { Prisma } from "../../generated/prisma/client";
import { AppError } from "../libs/errors";
import { prisma } from "../libs/prisma";
import type { ITask, ITaskPayload } from "../types/task.types";

export const searchTasksWithFilters = async (
  name?: string,
  status?: string,
) => {
  const whereClause: Prisma.TaskWhereInput = {};

  if (name) {
    whereClause.title = {
      contains: name,
      mode: "insensitive",
    };
  }

  if (status === "active") {
    whereClause.NOT = { startedAt: null };
    whereClause.endedAt = null;
  } else if (status === "inactive") {
    whereClause.startedAt = null;
  } else if (status === "completed") {
    whereClause.NOT = [{ startedAt: null }, { endedAt: null }];
  }

  return await prisma.task.findMany({
    where: whereClause,
    orderBy: [
      {
        endedAt: {
          sort: "asc",
          nulls: "first",
        },
      },
      {
        startedAt: {
          sort: "asc",
          nulls: "last",
        },
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

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

export const startTask = async (id: string) => {
  if (!id) throw new AppError("Task ID is required", 400);

  const result = await prisma.$transaction(async (tx) => {
    const task = await tx.task.findUnique({ where: { id } });
    if (!task) throw new AppError("Task not found", 404);

    const isTaskStarted = await tx.task.findFirst({
      where: { id: task.id, NOT: { startedAt: null } },
      select: { id: true },
    });

    if (isTaskStarted) throw new AppError("Task already started", 409);

    return await tx.task.updateMany({
      where: { id, startedAt: null },
      data: { startedAt: new Date() },
    });
  });

  if (result.count === 0) throw new AppError("Task not found", 404);

  return result;
};

export const endTask = async (id: string) => {
  if (!id) throw new AppError("Task ID is required", 400);

  const result = await prisma.$transaction(async (tx) => {
    const task = await tx.task.findUnique({ where: { id } });
    if (!task) throw new AppError("Task not found", 404);

    return await tx.task.updateMany({
      where: { id, NOT: { startedAt: null }, endedAt: null },
      data: { endedAt: new Date() },
    });
  });
  if (result.count === 0) throw new AppError("Task not found", 404);

  return result;
};

export const removeTask = async (id: string): Promise<void> => {
  if (!id) throw new AppError("Task ID is required", 400);

  await prisma.$transaction(async (tx) => {
    const task = await tx.task.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!task) throw new AppError("Task not found", 404);

    const deletedTask = await tx.task.delete({
      where: { id },
      select: { id: true },
    });

    return deletedTask;
  });
};

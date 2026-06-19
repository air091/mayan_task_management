import { AppError } from "../libs/errors";
import { prisma } from "../libs/prisma";

export const addTask = async (title: string, description: string) => {
  if (!title || !description)
    throw new AppError("All fields are required", 400);

  title = title.trim();

  const task = await prisma.task.create({
    data: {
      title,
      description,
    },
  });

  return task;
};

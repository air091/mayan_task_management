import type { Request, Response } from "express";
import { AppError } from "../libs/errors";
import {
  createTask,
  editTask,
  findAllTasks,
  findTaskById,
  removeTask,
} from "../services/task.service";

export const postTask = async (request: Request, response: Response) => {
  try {
    const { title, description } = request.body;
    const task = await createTask({ title, description });
    return response
      .status(201)
      .json({ success: true, message: "Task created successfully", task });
  } catch (error) {
    console.error("Post task failed", error);
    let errMessage = "Internal server error";
    let statusCode = 500;

    if (error instanceof AppError) {
      errMessage = error.message;
      statusCode = error.statusCode;
    }

    return response
      .status(statusCode)
      .json({ success: false, message: errMessage });
  }
};

export const getAllTask = async (request: Request, response: Response) => {
  try {
    const tasks = await findAllTasks();
    return response
      .status(200)
      .json({ success: true, message: "Tasks fetched successfully", tasks });
  } catch (error) {
    console.error("Get task by id failed", error);

    let errMessage = "Internal server error";
    let statusCode = 500;

    if (error instanceof AppError) {
      errMessage = error.message;
      statusCode = error.statusCode;
    }

    return response.status(statusCode).json({ message: errMessage });
  }
};

export const getTaskById = async (request: Request, response: Response) => {
  try {
    const { taskId } = request.params;
    const task = await findTaskById(taskId as string);
    return response
      .status(200)
      .json({ success: true, message: "Task fetched successfully", task });
  } catch (error) {
    console.error("Get task by id failed", error);

    let errMessage = "Internal server error";
    let statusCode = 500;

    if (error instanceof AppError) {
      errMessage = error.message;
      statusCode = error.statusCode;
    }

    return response.status(statusCode).json({ message: errMessage });
  }
};

export const putTask = async (request: Request, response: Response) => {
  try {
    const { taskId } = request.params;
    const { title, description } = request.body;

    const task = await editTask(taskId as string, { title, description });
    return response
      .status(200)
      .json({ success: true, message: "Task updated successfully", task });
  } catch (error) {
    console.error("Get task by id failed", error);

    let errMessage = "Internal server error";
    let statusCode = 500;

    if (error instanceof AppError) {
      errMessage = error.message;
      statusCode = error.statusCode;
    }

    return response.status(statusCode).json({ message: errMessage });
  }
};

export const deleteTaskC = async (request: Request, response: Response) => {
  try {
    const { taskId } = request.params;
    await removeTask(taskId as string);
    return response
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Get task by id failed", error);

    let errMessage = "Internal server error";
    let statusCode = 500;

    if (error instanceof AppError) {
      errMessage = error.message;
      statusCode = error.statusCode;
    }

    return response.status(statusCode).json({ message: errMessage });
  }
};

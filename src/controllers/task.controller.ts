import type { Request, Response } from "express";
import { AppError } from "../libs/errors";
import { addTask } from "../services/task.service";

export const postTask = async (request: Request, response: Response) => {
  try {
    const { title, description } = request.body;
    const task = await addTask({ title, description });
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

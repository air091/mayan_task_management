export interface ITask {
  id: string;
  title: string;
  description: string | null;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskPayload {
  title: string;
  description: string;
}

export interface IDeletedTask {
  id: string;
  isComplete: boolean;
}

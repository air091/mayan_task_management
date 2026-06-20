export interface ITask {
  id: string;
  title: string;
  description: string | null;
  startedAt: Date | null;
  endedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskPayload {
  title: string;
  description: string;
}

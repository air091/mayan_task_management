export interface ITask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTask {
  title: string;
  description: string;
}

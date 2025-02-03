import { ObjectId } from 'mongodb';

export interface Task {
  _id?: ObjectId;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

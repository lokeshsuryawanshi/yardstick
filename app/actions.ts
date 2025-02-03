'use server';

import clientPromise from './lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface Task {
  _id?: ObjectId;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

/** Create a new task */
export async function createTask(data: FormData) {
  const title = data.get('title') as string;
  const description = data.get('description') as string;
  const dueDate = data.get('dueDate') as string;

  const newTask: Task = {
    title,
    description,
    dueDate,
    completed: false,
  };

  const client = await clientPromise;
  const db = client.db('task-manager');
  await db.collection('tasks').insertOne(newTask);

  revalidatePath('/');
}

/** Update an existing task */
export async function updateTask(data: FormData) {
  const id = data.get('id') as string;
  const title = data.get('title') as string;
  const description = data.get('description') as string;
  const dueDate = data.get('dueDate') as string;

  const client = await clientPromise;
  const db = client.db('task-manager');
  await db.collection('tasks').updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, description, dueDate } }
  );

  revalidatePath('/');
  redirect('/');
}

/** Delete a task */
export async function deleteTask(taskId: string) {
  const client = await clientPromise;
  const db = client.db('task-manager');
  await db.collection('tasks').deleteOne({ _id: new ObjectId(taskId) });

  revalidatePath('/');
}

/** Toggle task completion status */
export async function toggleTaskCompletion(taskId: string, completed: boolean) {
  const client = await clientPromise;
  const db = client.db('task-manager');
  await db.collection('tasks').updateOne(
    { _id: new ObjectId(taskId) },
    { $set: { completed } }
  );

  revalidatePath('/');
}


import { updateTask } from '../../actions';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async  function EditTask({ params }: EditPageProps) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db('task-manager');
  const task = await db
    .collection('tasks')
    .findOne({ _id: new ObjectId(id) });

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Task Not Found</h2>
          <p className="text-gray-600">The task you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
            <h1 className="text-3xl font-extrabold text-white text-center tracking-tight">
              Edit Task
            </h1>
          </div>
          <form action={updateTask} className="p-8 space-y-6">
            <input type="hidden" name="id" value={id} />
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={task.title}
                  required
                  className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  defaultValue={task.description}
                  required
                  className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out h-32"
                ></textarea>
              </div>
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  defaultValue={task.dueDate}
                  required
                  className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
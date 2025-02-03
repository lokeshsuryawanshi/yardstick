import { createTask, deleteTask, toggleTaskCompletion, Task } from './actions';
import clientPromise from '../app/lib/mongodb';

export default async function Home() {
  // Fetch tasks from the database
  const client = await clientPromise;
  const db = client.db('task-manager');
  
  const tasksRaw = await db.collection<Task>('tasks').find({}).toArray();

  // Convert non-plain objects (like ObjectId) to plain values
  const tasks = tasksRaw.map(task => ({
    ...task,
    _id: task._id?.toString() ?? "",
  }));

  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <h1 className="text-4xl font-extrabold text-white text-center tracking-tight">
    
            Task Manager
          </h1>
        </div>

        {/* Create Task Form */}
        <div className="p-8 space-y-6">
          <form action={createTask} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
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
                Add Task
              </button>
            </div>
          </form>

          {/* Task List */}
          {tasks.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No tasks yet. Start by adding a task above!
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task._id?.toString()}
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                >
                  <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div className="flex-grow">
                      <h2
                        className={`text-xl font-bold mb-2 ${
                          task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                        }`}
                      >
                        {task.title}
                      </h2>
                      <p className="text-gray-600 mb-2">{task.description}</p>
                      <p className="text-sm text-gray-500">
                        Due: {task.dueDate}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* Toggle Completion */}
                      <form
                        action={async (formData: FormData) => {
                          "use server";
                          await toggleTaskCompletion(task._id!.toString(), !task.completed);
                        }}
                      >
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                          bg-green-100 text-green-700 hover:bg-green-200"
                        >
                          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                      </form>
                      {/* Delete Task */}
                      <form
                        action={async () => {
                          "use server";
                          await deleteTask(task._id!.toString());
                        }}
                      >
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                          bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </form>
                      {/* Edit Link */}
                      <a
                        href={`/edit/${task._id?.toString()}`}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
                        bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
    </>
  );
}


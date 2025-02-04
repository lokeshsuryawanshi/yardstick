# Task Manager Application

## Overview
Task Manager is a simple application that allows you to create, view, edit, and delete tasks. Each task includes a title, description, due date, and a completion status. The app is built using Next.js with Server Actions, MongoDB for data persistence, TypeScript for type safety, and Tailwind CSS for styling.

## Prerequisites
Before you begin, make sure you have the following installed on your system:
- **Node.js** (v16 or later) – [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** – Either a local installation or a cloud instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Additionally, you may find these documentation resources helpful:
- [Next.js Server Actions Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [MongoDB Node.js Driver Usage Examples](https://www.mongodb.com/docs/drivers/node/current/usage-examples/)

## Installation
Follow these steps to set up the application locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/lokeshsuryawanshi/yardstick.git
   cd yardstick

2. ## Install Dependencies

Install the required packages using npm:

```bash
npm install
```

3. ## Configure Environment Variables

Create a file named `.env.local` in the root directory of the project and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-manager?retryWrites=true&w=majority
```

4. ## Tailwind CSS Setup

Tailwind CSS is already configured in the project. If you wish to learn more or customize the styles, refer to the [Tailwind CSS Documentation](https://tailwindcss.com/).

5. ## Running the Application

Start the development server by running:

```bash
npm run dev
```

After the server starts, open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Features

- **Create Tasks:** Add new tasks with a title, description, and due date.
- **View Tasks:** See a list of all tasks, including their completion status.
- **Edit Tasks:** Update task details. After editing, the app redirects you back to the main page.
- **Delete Tasks:** Remove tasks from the list.
- **Toggle Completion:** Mark tasks as complete or incomplete.
- **Auto Update:** The application automatically refreshes the task list after any change.

## Project Structure

```
/app
│── page.tsx                # Main page displaying the task list and form
│── /edit/[id]/page.tsx     # Page for editing an existing task
/lib
│── mongodb.ts              # MongoDB connection setup
/app/actions.ts             # Server actions for handling tasks (create, update, delete, toggle)
/styles                     # Contains global CSS files, including Tailwind CSS configuration
```

## Additional Information

- **Server Actions & Revalidation:** The app leverages Next.js Server Actions. After any task operation, the page revalidates to display the latest data.
- **Redirection:** Once a task is updated, the app automatically redirects back to the main page.
- **Handling Dynamic Parameters:** The project is configured to properly handle asynchronous route parameters for editing tasks.

If you have any questions or run into issues, please consult the documentation links provided or feel free to reach out. 

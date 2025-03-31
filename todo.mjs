import { Command } from "commander";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const program = new Command();
const client = new PrismaClient();

program.name("Todo-CLI-App")
  .version("1.0.0")
  .description("Building Todo App using Terminal");

program.command("add-task")
  .description("Add a new task")
  .requiredOption("-t, --task <value>", "Add task title")
  .requiredOption("-d, --description <value>", "Task Description")
  .option("-m, --mark", "Mark as Done", false) 
  .action(async (options) => {
    const title = options.task;
    const description = options.description;
    const mark = options.mark;

    try {
        const newTask = await client.Todo.create({
            data: {
                id: nanoid(5),
                title,
                description,
                complete: mark
            }
        });
        console.log("Task added successfully:", newTask);
    } catch (e) {
        console.error("Error adding new task!");
    } finally {
        await client.$disconnect();
    }
  });


  program.command("list-tasks")
  .description("List tasks (all by title, done, or not done)")
  .option("-s, --status <value>", "Filter tasks by status (done/not-done)")
  .action(async (options) => {
    let tasks;

    try {
      if (options.status === "done") {
        tasks = await client.Todo.findMany({ where: { complete: true } });
      } else if (options.status === "not-done") {
        tasks = await client.Todo.findMany({ where: { complete: false } });
      } else {
        tasks = await client.Todo.findMany({ orderBy: { title: "asc" } });
      }

      if (tasks.length === 0) {
        console.log("No tasks found.");
      } else {
        console.log("\n📝 Task List:");
        tasks.forEach(task => {
          console.log(`- ${task.title} [${task.complete ? "✅ Done" : "❌ Not Done"}]`);
        });
      }
    } catch (e) {
      console.error("Error listing tasks:", e.message);
    } finally {
      await client.$disconnect();
    }
  });


  program.command("update-task")
  .description("Update an existing task")
  .requiredOption("-t, --task <value>", "Task title to update")
  .option("-d, --description <value>", "New description")
  .option("-m, --mark", "Mark as Done")
  .action(async (options) => {
    const title = options.task;
    const newDescription = options.description;
    const mark = options.mark;

    try {
      const existingTask = await client.Todo.findUnique({
        where: { title },
      });

      if (!existingTask) {
        console.error("Error: Task not found");
        return;
      }

      const updatedTask = await client.Todo.update({
        where: { title },
        data: {
          description: newDescription || existingTask.description,
          complete: mark !== undefined ? mark : existingTask.complete,
        },
      });

      console.log("Task updated successfully:", updatedTask);
    } catch (e) {
      console.error("Error updating task!");
    } finally {
      await client.$disconnect();
    }
  });


  program.command("delete-task")
  .description("Delete a task")
  .requiredOption("-t, --task <value>", "Task title to delete")
  .action(async (options) => {
    const title = options.task;

    try {
      const existingTask = await client.Todo.findUnique({
        where: { title },
      });

      if (!existingTask) {
        console.error("Error: Task not found");
        return;
      }


      await client.Todo.delete({
        where: { title },
      });

      console.log(`Task '${title}' deleted successfully.`);
    } catch (e) {
      console.error("Error deleting task:", e.message);
    } finally {
      await client.$disconnect();
    }
  });






program.parse();

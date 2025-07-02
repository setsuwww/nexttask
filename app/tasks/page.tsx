import { Task } from "./TaskCard"
import { getTasks } from "@/function/task"
import TaskList from "./TaskList"

export default async function page() {
  const todosFromDb = await getTasks()

  const initialTasks: Task[] = todosFromDb.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    started: task.started.toISOString(),
    end: task.end ? task.end.toISOString() : "",
    status: mapStatusToDisplay(task.status),
  }))

  return <TaskList tasks={initialTasks} />
}

function mapStatusToDisplay(status: string): Task["status"] {
  switch (status) {
    case "SUCCESS": return "Success"
    case "PROCESS": return "Process"
    case "FAILED": return "Failed"
    default: return "Failed"
  }
}

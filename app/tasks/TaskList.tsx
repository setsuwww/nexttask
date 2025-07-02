"use client"

import React, { useState, useCallback } from "react"
import TaskCard, { Task } from "./TaskCard"

function TaskList({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks)

  const handleStatusUpdate = useCallback(async (id: number, status: "Success" | "Failed") => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status.toUpperCase() }),
      })

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status } : task
        )
      )
    } catch (err) {
      console.error("Update failed", err)
    }
  }, [])

  const handleDelete = useCallback(async (id: number) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (err) {
      console.error("Delete failed", err)
    }
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">List Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onSubmit={(status) => handleStatusUpdate(task.id, status)}
            onDelete={() => handleDelete(task.id)}
            onEdit={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
export default React.memo(TaskList)

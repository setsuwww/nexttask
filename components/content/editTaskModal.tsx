"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Task {
  id: number,
  title: string,
  description: string
}

interface EditTask {
  task: Task,
  open: boolean,
  onClose: () => void,
  onSave: () => void
}

export default function EditTaskModal({ task, open, onClose, onSave }: EditTask) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTitle(task.title)
    setDescription(task.description)
  }, [task])

  const handleSubmit = async () => {
    try {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })

    if(!res.ok) throw new Error("Failed to Update Task")
    onSave()
    onClose()
    } 
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md sm:w-full">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        </div>
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="default" onClick={handleSubmit}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

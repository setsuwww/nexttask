'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import { addTask } from '@/function/task'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

export default function CreateTaskPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [started, setStarted] = useState('')
  const [end, setEnd] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description) return

    try {
      await addTask({
        title,
        description,
        started: started ? new Date(started) : undefined,
        end: end ? new Date(end) : undefined,
      })
      startTransition(() => {
        router.push("/tasks")
      })
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mx-auto py-10 px-10">
      <h1 className="text-2xl font-bold mb-6">Create new Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Task title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Task Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Task Description"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="started">Started</Label>
          <Input
            id="started"
            type="datetime-local"
            value={started}
            onChange={e => setStarted(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end">Deadline (optional)</Label>
          <Input
            id="end"
            type="datetime-local"
            value={end}
            onChange={e => setEnd(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full"disabled={isSubmitting || isPending}>
          {(isSubmitting || isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {(isSubmitting || isPending) ? 'Saving...' : 'Save Task'}
        </Button>
      </form>
    </Card>
  )
}

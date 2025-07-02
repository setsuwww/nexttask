'use server'

import { prisma } from '@/lib/prisma'

export async function getTasks() {
  return await prisma.task.findMany({ orderBy: { started: 'desc' } })
}

type TaskInput = {
  title: string
  description: string
  started?: Date
  end?: Date
}

export async function addTask(data: TaskInput) {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      started: data.started ?? now,
      end: data.end ?? tomorrow,
    },
  })
}

export async function updateStatus(id: number, status: 'PROCESS' | 'SUCCESS' | 'FAILED') {
  return await prisma.task.update({
    where: { id },
    data: { status },
  })
}

export async function deleteTask(id: number) {
  return await prisma.task.delete({ where: { id } })
}

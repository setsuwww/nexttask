import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const body = await req.json()
    const { title, description } = body

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
      },
    })

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("PATCH error:", error)
    return new NextResponse("Failed to update task", { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)

    await prisma.task.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("DELETE error:", error)
    return new NextResponse("Failed to delete task", { status: 500 })
  }
}


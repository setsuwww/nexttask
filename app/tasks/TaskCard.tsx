"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, CheckCircle, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useFormattedDate } from "@/lib/useFormatedDate"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import EditTaskModal from "@/components/content/editTaskModal"

export type Task = {
  id: number
  title: string
  description: string
  status: "Success" | "Process" | "Failed"
  onSubmit?: (status: "Success" | "Failed") => void
  onEdit?: () => void
  onDelete?: () => void
}

function TaskCard({ id, title, description, status, onSubmit, onEdit, onDelete }: Task) {

  const [currentStatus, setCurrentStatus] = useState(status)
  const [showEdit, setShowEdit] = useState(false)

  const router = useRouter()

  const statusColor =
    currentStatus === "Success" ? "text-green-700 bg-green-100 border-green-300"
      : currentStatus === "Failed" ? "text-red-700 bg-red-100 border-red-300"
        : "text-yellow-700 bg-yellow-100 border-yellow-300"

  return (
    <div className="bg-white border p-6 rounded-2xl shadow-md hover:shadow-lg transition-all space-y-4 h-full flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${statusColor}`}>
              <FileText size={28} />
            </div>
              <h2 className="text-base lg:text-lg font-semibold break-words">{title}</h2>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full border font-medium ${statusColor}`}>
            {currentStatus}
          </span>
        </div>

        <div className="border-b" />

        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Action Buttons */}
      {currentStatus === "Process" && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-x-1">
            <Button variant="ghost" size="icon" onClick={() => setShowEdit(true)} className="hover:bg-blue-50 hover:border-blue-100">
              <Edit className="w-4 h-4 text-blue-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete} className="hover:bg-red-50 hover:border-red-100">
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <CheckCircle size={16} />
                Marked as
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="hover:bg-green-100"
                onClick={() => {
                  setCurrentStatus("Success")
                  onSubmit?.("Success")
                }}>
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                </span>
                Success
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-red-100"
                onClick={() => {
                  setCurrentStatus("Failed")
                  onSubmit?.("Failed")
                }}>
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
                </span>
                Failed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <EditTaskModal
        task={{ id, title, description }}
        open={showEdit}
        onClose={() => setShowEdit(false)}
        onSave={() => router.refresh()}
      />

    </div>
  )
}
export default React.memo(TaskCard)

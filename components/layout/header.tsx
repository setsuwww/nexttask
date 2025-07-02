"use client"

import Link from "next/link"
import { Menu, Clock, ListTodo, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./sidebar"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-[18px] border-b bg-white sticky top-0 z-10 md:px-6">
      <div className="lg:hidden flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <h1 className="text-sm lg:text-lg font-bold text-gray-950">Nexttask</h1>

      <div className="flex items-center justify-end space-x-2">
        {/* History */}
        <Button asChild variant="outline" size="icon" className="md:hidden" aria-label="History">
          <Link href="/history">
            <Clock className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="hidden md:flex gap-2">
          <Link href="/history">
            <Clock className="h-4 w-4" />
            History
          </Link>
        </Button>

        {/* Tasks */}
        <Button asChild variant="outline" size="icon" className="md:hidden" aria-label="Tasks">
          <Link href="/tasks">
            <ListTodo className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="hidden md:flex gap-2">
          <Link href="/tasks">
            <ListTodo className="h-4 w-4" />
            Tasks
          </Link>
        </Button>

        {/* Create Task */}
        <Button asChild variant="default" size="icon" className="md:hidden" aria-label="Create Task">
          <Link href="/tasks/create">
            <PlusCircle className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="default" size="sm" className="hidden md:flex gap-2">
          <Link href="/tasks/create">
            <PlusCircle className="h-4 w-4" />
            Create Task
          </Link>
        </Button>
      </div>

    </header>
  )
}

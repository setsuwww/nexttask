"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { LayoutDashboard, ListTodo, PlusCircle, Clock } from "lucide-react"
import Image from "next/image"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", href: "/tasks", icon: ListTodo },
  { label: "Task History", href: "/tasks/history", icon: Clock },
  { label: "Create Task", href: "/tasks/create", icon: PlusCircle },
]

function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 z-40 hidden md:flex w-64 h-screen bg-white border-r shadow-sm flex-col justify-between">
      <div>
        <div className="flex items-center space-x-1 px-6 py-5 text-xl font-bold border-b">
          <Image src="/nextschool.png" alt="" width={50} height={50} />
          <p>
            <span className="text-gray-950">Next</span>
            <span className="text-gray-600">Task</span>
          </p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href 

            return (
              <Link key={href} href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-r-md text-sm font-medium transition-all relative
                  ${isActive
                    ? "bg-gray-100 text-primary font-semibold border-l-4 border-primary pl-2"
                    : "text-muted-foreground hover:bg-muted hover:text-primary pl-2"
                  }`}>
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            )

          })}
        </nav>
      </div>

      <div className="px-4 py-3 text-xs text-muted-foreground border-t">
        &copy; {new Date().getFullYear()} SetsuMSC
      </div>
    </aside>
  )
}

export default React.memo(Sidebar)

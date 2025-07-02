"use client"

import { useEffect, useState } from "react"

export function useFormattedDate(dateStr: string) {
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    const isMobile = window.innerWidth < 640
    const final = isMobile ? `${day}-${month}` : `${day}-${month}-${year}`
    setFormattedDate(final)
  }, [dateStr])

  return formattedDate
}

import { format } from "date-fns"

export const formatCheck = (date: Date | string, toFormat: string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return format(dateObj, toFormat)
}

export const displaySentenceDate = (date: Date | string) => formatCheck(date, "EE, dd MMM")
export const displayDateAndTime = (date: Date | string) => formatCheck(date, "dd MMM yyyy, HH:mm")

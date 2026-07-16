"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const isSuccess = type === "success"

  return (
    <div
      id="notification"
      className={`mb-2 rounded px-4 py-2 text-white ${
        isSuccess ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  )
}
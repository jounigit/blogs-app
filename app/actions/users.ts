"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const registerUser = async (
  prevState: { errors: Record<string, string>; values: Record<string, string> },
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (password !== confirmPassword) {
    return { errors: { confirmPassword: "Passwords do not match" }, values: { username, name } }
  }
  const errors: Record<string, string> = {}

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  if (!name || name.length < 4) {
    errors.name = "Name must be at least 4 characters long"
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  const existingUser = await db.select().from(users).where(eq(users.username, username))

  if (existingUser) {
    return { errors: { username: "Username already exists" }, values: { username, name } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}
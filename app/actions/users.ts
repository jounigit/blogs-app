"use server"

import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const registerUser = async (
  prevState: { 
    errors: Record<string, string>; values: Record<string, string>; success: boolean },
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const errors: Record<string, string> = {}

  if (password !== confirmPassword) {
    return { errors: { confirmPassword: "Passwords do not match" }, values: { username, name }, success: false }
  }

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
    return { errors, values: { username, name }, success: false }
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username)
  })

  if (existingUser) {
    return { errors: { username: "Username already exists" }, values: { username, name }, success: false }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  try {
    await db.insert(users).values({ username, name, passwordHash })
  } catch (error) {
    return { errors: { form: error instanceof Error ? error.message : "Unable to register user" }, values: { username, name }, success: false }
  }

  return { errors: {}, values: { username, name }, success: true }
}
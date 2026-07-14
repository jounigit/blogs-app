"use server"

import { db } from "@/db"
import { readingList } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { readBlog } from "../services/readinglist"

export async function addToReadingList(formData: FormData) {
  const userId = Number(formData.get("userId"))
  const blogId = Number(formData.get("blogId"))
  await db.insert(readingList).values({ userId, blogId })

  revalidatePath("/me")
}

export const toggleReadStatus = async (formData: FormData) => {
  const userId = Number(formData.get("userId"))
  const blogId = Number(formData.get("blogId"))
  await readBlog(userId, blogId)

  revalidatePath("/me")
}

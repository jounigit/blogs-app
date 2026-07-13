"use server"

import { db } from "@/db"
import { readingList } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function addToReadingList(formData: FormData) {
  const userId = Number(formData.get("userId"))
  const blogId = Number(formData.get("blogId"))
  await db.insert(readingList).values({ userId, blogId })

  revalidatePath("/me")
}

export async function getReadingListByUserId(userId: number) {
  const list = await db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  })
  return list
}
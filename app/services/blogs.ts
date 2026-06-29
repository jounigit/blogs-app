import { eq, ilike } from "drizzle-orm";
import { db } from "@/db"
import { blogs } from "@/db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async (filter?: string) => {
  if (filter) {
    const filteredBlogs = await db.select()
    .from(blogs).where(ilike(blogs.title, `%${filter.toLowerCase()}%`))
    return filteredBlogs
  }

  return db.query.blogs.findMany()
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("No user found")
  }

  await db.insert(blogs).values({
    title,
    author,
    url,
    userId: user.id,
  })    
}

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
    .update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id))
  }
}
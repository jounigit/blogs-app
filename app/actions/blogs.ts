"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"
import { auth } from "@/auth"
import type { BlogFormState } from "./blogs-state"

export const createBlog = async (
  _prevState: BlogFormState,
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  const errors: BlogFormState["errors"] = {}

  if (!title || title.length < 5) {
    errors.title = "Blog title must be at least 5 characters long"
  }

  if (!author || author.length < 5) {
    errors.author = "Blog author must be at least 5 characters long"
  }

  if (!url || url.length < 5) {
    errors.url = "Blog url must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { 
      errors, 
      success: false,
      values: { title, author, url } }
  }

  try {
    await addBlog(title, author, url)
  } catch (error) {
    return {
      errors: {
        form: error instanceof Error ? error.message : "Unable to create blog",
      },
      values: { title, author, url },
      success: false
    }
  }

  revalidatePath("/blogs")
  return { 
    errors: {},
    values: { title, author, url },
    success: true
  }
}

export const toggleLikeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
"use client"

import { useActionState, useEffect, } from "react"
import { createBlog } from "../../actions/blogs"
import { initialState } from "../../actions/blogs-state"
import { useNotification } from "@/app/components/NotificationContext"
import { useRouter } from "next/navigation"
import SubmitButton from "@/app/components/SubmitButton"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!", "success")
      router.push("/blogs")
    } else if (Object.keys(state.errors).length > 0) {
      showNotification("Failed to create blog. Please check the form for errors.", "error")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl text-start">create new blog</h2>
      <form action={formAction} className="flex flex-col gap-4 mt-4">

        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={state.values?.title}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
          {state.errors?.title && <p className="text-red-600 text-sm">{state.errors?.title}</p>}
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={state.values?.author}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
          {state.errors?.author && <p className="text-red-600 text-sm">{state.errors?.author}</p>}
        </div>

        <div>
          <label htmlFor="url">URL</label>
          <input
            id="url"
            name="url"
            type="text"
            defaultValue={state.values?.url}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
          {state.errors?.url && <p className="text-red-600 text-sm">{state.errors?.url}</p>}
        </div>

        <SubmitButton id="create-blog-button">
          create
        </SubmitButton>
      </form>
    </div>
  )
}

export default NewBlog
"use client"

import { useActionState, } from "react"
import { createBlog } from "../../actions/blogs"
import { initialState } from "../../actions/blogs-state"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)

  return (
    <div className="m-4">
      <h2 className="text-2xl text-start">create new blog</h2>
      <form action={formAction} className="flex flex-col gap-4 mt-4">
        {state.errors?.form && <p className="text-red-600">{state.errors?.form}</p>}

        <div>
          <label htmlFor="title">title</label>
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
          <label htmlFor="author">author</label>
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
          <label htmlFor="url">url</label>
          <input
            id="url"
            name="url"
            type="text"
            defaultValue={state.values?.url}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
          {state.errors?.url && <p className="text-red-600 text-sm">{state.errors?.url}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
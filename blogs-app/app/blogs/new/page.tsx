import { createBlog } from "../../actions/blogs";

const NewBlog = () => {
  return (
    <div className="m-4">
      <h2 className="text-2xl text-align: start">create new blog</h2>
      <form action={createBlog} className="flex flex-col gap-4 mt-4">
        <div>
          <label htmlFor="title">title</label>
          <input id="title" name="title" type="text" className="border border-gray-300 rounded px-2 py-1 w-full" />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input id="author" name="author" type="text" className="border border-gray-300 rounded px-2 py-1 w-full" />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input id="url" name="url" type="text" className="border border-gray-300 rounded px-2 py-1 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
          create
        </button>
      </form>
    </div>
  );
}

export default NewBlog
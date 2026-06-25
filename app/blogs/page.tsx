import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({ searchParams, }: {
  searchParams: Promise<{ filter?: string }>
}
) => {

  const { filter } = await searchParams

  const blogs = await getBlogs(filter)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const searchButton = (
    <form method="get" className="mb-4">
      <input
        type="text"
        name="filter"
        placeholder="Search blogs..."
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Search
      </button>
    </form>
  )

  return (
    <div className="m-4">
      <h2 className="text-2xl text-align: start">blogs</h2>
      {searchButton}
      <ul className="list-disc pl-5">
        {sortedBlogs.map(blog => (
          <li key={blog.id} className="mb-4">
            <Link href={`/blogs/${blog.id}`}>
                <h3 className="font-bold hover:underline">{blog.title}</h3>
            </Link>
            <p>By {blog.author}</p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
                Read more
            </a>
            <p>Likes: {blog.likes}</p>
            {/* <p>--------------------------</p> */}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
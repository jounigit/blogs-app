import { getBlogs } from "../services/blogs"
import NavLink from "../components/NavLink"

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
        data-testid="filter-input"
        type="text"
        name="filter"
        placeholder="Search blogs..."
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      />
      <button data-testid="search-button" type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Search
      </button>
    </form>
  )

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">blogs</h2>
      {searchButton}
      <ul data-testid="blogs-list" className="space-y-2">
        {sortedBlogs.map(blog => (
          <li key={blog.id} className="mb-4">
            <NavLink
              name={blog.title}
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
             >
              {blog.title}
             </NavLink> 
            <p>By {blog.author}</p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
                Read more
            </a>
            {blog.likes === 0 && <p>0 likes</p>}
            {blog.likes > 0 && <p>Likes: {blog.likes}</p>}
            {/* <p>--------------------------</p> */}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
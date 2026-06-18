import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()

  return (
    <div className="m-4">
      <h2 className="text-2xl text-align: start">blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
                <h3>{blog.title}</h3>
            </Link>
            <p>By {blog.author}</p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
                Read more
            </a>
            <p>Likes: {blog.likes}</p>
            <p>--------------------------</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
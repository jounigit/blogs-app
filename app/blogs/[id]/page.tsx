import { toggleLikeBlog } from "@/app/actions/blogs"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const blog = await getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div className="m-4">
            <h2 className="text-2xl text-align: start">{blog.title}</h2>
            <p>By {blog.author}</p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
                Read more
            </a>
            <p>Likes: {blog.likes}</p>
            <form action={toggleLikeBlog} className="mt-4">
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Like
                </button>
            </form>
        </div>
    )
}

export default BlogPage
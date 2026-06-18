import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const blog = getBlogById(Number(id))

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
        </div>
    )
}

export default BlogPage
import { toggleLikeBlog } from "@/app/actions/blogs"
import { addToReadingList } from "@/app/actions/readinglist"
import { getBlogById } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const user = await getCurrentUser()
    const blog = await getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div id="blog-detail" className="max-w-2xl mx-auto p-6">
            <h2 id="blog-title" className="text-2xl text-align: start">{blog.title}</h2>
            <p id="blog-author">By {blog.author}</p>

            {/* forms to inline div */}
            <div className="flex flex-row gap-4">
            <form action={toggleLikeBlog} className="mt-4">
                <input type="hidden" name="id" value={blog.id} />
                <label htmlFor="like" className="mr-2">Likes: {blog.likes}</label>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Like
                </button>
            </form>
            <form action={addToReadingList} className="mt-4">
                <input type="hidden" name="userId" value={user?.id} />
                <input type="hidden" name="blogId" value={blog.id} />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Add to Reading List
                </button>
            </form>
            </div>

            <a href={blog.url}
                target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 block">
                {blog.url}
            </a>
        </div>
    )
}

export default BlogPage
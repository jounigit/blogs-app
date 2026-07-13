import { redirect } from "next/navigation"
import { generateTokenForUser } from "../actions/me"
import SubmitButton from "../components/SubmitButton"
import { getCurrentUser } from "../services/session"
import { getReadingListByUserId } from "../services/readinglist"

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingListByUserId(user.id)
  const blogs = readingList.map(item => item.blog)

  const token = user.token || "No token found."

  return (
    <div className="max-w-2xl mx-auto mt-4 p-6 border border-gray-300 rounded shadow">
      <h2 className="text-2xl font-bold">MyProfile</h2>
      <p><em>Name</em>: {user.name}</p>
      <p><em>Username</em>: {user.username}</p>

      <hr className="border-t border-black my-4" />

      <h3 className="text-xl font-bold">API Token</h3>

      {/* create light gray and 20px margins div  */}
      <div className="bg-gray-100 p-4 my-4">
        <p className="mb-2">Current token:</p>
          <div className="bg-gray-200 mb-2 p-2 rounded">  
            <p>{token}</p>
          </div>
          <form action={generateTokenForUser}>
            <SubmitButton>
              Generate New Token
            </SubmitButton>
          </form>
      </div>

      <hr className="border-t border-black my-4" />

      <h3 className="text-xl font-bold">Reading list</h3>
      {readingList.length === 0 ? (
        <p>No blogs in your reading list.</p>
      ) : (
        <ul className="list-disc pl-5">
          {blogs.map(blog => (
            <li key={blog.id}>
              <a href={blog.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {blog.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}  
import { redirect } from "next/navigation"
import { generateTokenForUser } from "../actions/me"
import SubmitButton from "../components/SubmitButton"
import { getCurrentUser } from "../services/session"
import { getReadingListByUserId } from "../services/readinglist"
import { toggleReadStatus } from "../actions/readinglist"


function ToggleForm(props: { id: number, _id: number }) {
  return (<form action={toggleReadStatus}>
    <input type="hidden" name="userId" value={props.id} />
    <input type="hidden" name="blogId" value={props._id} />
    <button type="submit" className="bg-green-600 text-white text-xs py-1 px-2 my-2 rounded hover:bg-green-700">
      mark as read
    </button>
  </form>);
}


export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const token = user.token || "No token found."

  const readingList = await getReadingListByUserId(user.id)
  const unReadBlogs = readingList.filter(item => !item.read).map(item => item.blog)
  const readBlogs = readingList.filter(item => item.read).map(item => item.blog)

  return (
    <div className="max-w-2xl mx-auto mt-4 p-6 border border-gray-300 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">MyProfile</h2>
      <p><span className="font-bold">Name:</span> <span className="text-sm text-gray-600">{user.name}</span></p>
      <p><span className="font-bold">Username:</span> <span id="user-username" className="text-sm text-gray-600">{user.username}</span></p>

      <hr className="border-t border-black my-4" />

      {/*****************  Readinglist ***************/}
      <h3 className="text-xl font-bold">Reading list</h3>
      {readingList.length === 0 && (
        <p>No blogs in your reading list.</p>
      )}
      {readingList.length > 0 && (
        <>
          <p className="font-bold mt-4 mb-2">Unread ({unReadBlogs.length})</p>
          <ul>
            {unReadBlogs.map((blog) => (
              // set elements in flex row with space between and center
              <li key={blog.id} className="flex flex-row  bg-amber-50 p-2 rounded mb-2">
                <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {blog.title}
                </a>
                {/* set form right side of element and center */}
                <span className="ml-auto flex items-center">
                  <ToggleForm id={user.id} _id={blog.id}></ToggleForm>
                </span>
                
              </li>
            ))}
          </ul>

          <p className="font-bold mt-4 mb-2">Read ({readBlogs.length})</p>
          <ul>
            {readBlogs.map((blog) => (
              <li key={blog.id} className="bg-emerald-50 p-2 rounded mb-2">
                <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {blog.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      <hr className="border-t border-black my-4" />

      {/*****************  API Token ***************/}
      <h3 className="text-xl font-bold">API Token</h3>

      {/* create light gray and 20px margins div  */}
      <div className="bg-gray-50 p-4 my-2 rounded">
        <p className="mb-2">Current token:</p>
        <div className="bg-gray-100 mb-2 p-2 rounded">
          <p className="font-bold">{token}</p>
        </div>
        <form action={generateTokenForUser}>
          <SubmitButton>
            Generate New Token
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}  
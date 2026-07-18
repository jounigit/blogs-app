import { redirect } from "next/navigation"
import { generateTokenForUser } from "../actions/me"
import { getCurrentUser } from "../services/session"
import { getReadingListByUserId } from "../services/readinglist"
import { toggleReadStatus } from "../actions/readinglist"


function ToggleForm(props: { id: number, _id: number }) {
  return (<form action={toggleReadStatus}>
    <input type="hidden" name="userId" value={props.id} />
    <input type="hidden" name="blogId" value={props._id} />
    <button 
      type="submit" 
      // data-testid="add-to-reading-list-button"
      data-testid="mark-read-"
      className="bg-green-600 text-white text-xs py-1 px-2 my-2 rounded hover:bg-green-700">
      mark as read
    </button>
  </form>);
}


export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingListByUserId(user.id)
  const unReadBlogs = readingList.filter(item => !item.read).map(item => item.blog)
  const readBlogs = readingList.filter(item => item.read).map(item => item.blog)

  return (
    <div className="max-w-2xl mx-auto mt-4 p-6 border border-gray-300 rounded shadow">
      <h2 data-testid="user-profile" className="text-2xl font-bold mb-4">MyProfile</h2>
      <p>
        <span className="font-bold">Name:</span> 
        <span data-testid="user-name" className="text-sm text-gray-600">{user.name}</span>
      </p>
      <p>
        <span className="font-bold">Username:</span> 
        <span data-testid="user-username" className="text-sm text-gray-600">{user.username}</span>
      </p>

      <hr className="border-t border-black my-4" />

      {/*****************  Readinglist ***************/}
      <h3 data-testid="reading-list-section" className="text-xl font-bold">Reading list</h3>
      {readingList.length === 0 && (
        <p data-testid="empty-reading-list">No blogs in your reading list.</p>
      )}
      {readingList.length > 0 && (
        <>
          {
          unReadBlogs.length === 0 
          ? (<p data-testid="no-unread-blogs"  className="font-bold mt-4 mb-2">No unread blogs</p>)
          : <p className="font-bold mt-4 mb-2">Unread ({unReadBlogs.length})</p>
          }
          
          <ul data-testid="unread-section">
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
      <div data-testid="api-token-section" className="bg-gray-50 p-4 my-2 rounded">
        <p className="mb-2">Current token:</p>
        <div data-testid="token-display" className="bg-gray-100 mb-2 p-2 rounded">
          {!user.token && <p data-testid="no-token-message">No token found.</p>}
          {user.token && <p data-testid="api-token">{user.token}</p>}
        </div>
        <form action={generateTokenForUser}>
          <button
          type="submit"
          name="Login"
          data-testid="generate-token-button"
          className="bg-blue-600 w-fit text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Generate New Token
        </button>
        </form>
      </div>
    </div>
  )
}  
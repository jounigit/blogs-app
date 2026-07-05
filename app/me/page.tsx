import { generateTokenForUser } from "../actions/me"
import SubmitButton from "../components/SubmitButton"
import { getCurrentUser } from "../services/session"

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold">MyProfile</h2>
        <p>No user found.</p>
      </div>
    )
  }

  const token = user.token || "No token found."

  return (
    <div className="max-w-2xl mx-auto p-6">
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
    </div>
  )
}  
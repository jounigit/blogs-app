// import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserById } from "../../services/users"

const UserPage = async ({ params }: { params: { id: string } }) => {
  const userId = Number(params.id)
  const user = await getUserById(Number(userId))

  if (!user) {
    notFound()
  }

  return (
    <div className="m-4">
      <h2 className="text-2xl text-align: start">user details</h2>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
    </div>
  )
}

export default UserPage
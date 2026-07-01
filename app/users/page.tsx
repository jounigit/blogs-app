import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">users</h2>
      <ul className="list-disc pl-5">
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>
                <h3 className="font-bold hover:underline">{user.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Users
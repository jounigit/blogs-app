import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="m-4">
      <h2 className="text-2xl text-align: start mb-4">users</h2>
      <ul className="list-disc pl-5">
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
                <h3 className="font-bold hover:underline">{user.name}</h3>
            </Link>
            {/* <p>Name: {user.name}</p> */}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Users
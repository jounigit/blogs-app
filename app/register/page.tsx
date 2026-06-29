import { registerUser } from "@/app/actions/users"

export default function RegisterPage() {
  return (
    <div className="m-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <form action={registerUser}>
        <div>
          <label>
            Username
            <input type="text" name="username" required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </label>
        </div>
        <button type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  )
}
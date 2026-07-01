"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  // eslint-disable-next-line no-undef
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
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
            Password
            <input type="password" name="password" required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
             />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
            Login
        </button>
      </form>
    </div>
  )
}
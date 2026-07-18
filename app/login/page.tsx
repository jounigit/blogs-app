"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const { showNotification } = useNotification()

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
      showNotification("logged in")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Login</h2>
      {error && <p data-testid="error-message" style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
            <input id="username" type="text" name="username" required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
             />
        </div>
        <div>
          <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
             />
        </div>
        <button
          type="submit"
          name="Login"
          data-testid="login-button"
          className="bg-blue-600 w-fit text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}
    
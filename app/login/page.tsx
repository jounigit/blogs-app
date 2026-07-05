"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import SubmitButton from "../components/SubmitButton"

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
      <h2 className="text-2xl font-bold">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
            <input type="text" name="username" required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
             />
        </div>
        <div>
          <label>Password</label>
            <input type="password" name="password" required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
             />
        </div>
        <SubmitButton>
          Login
        </SubmitButton>
      </form>
    </div>
  )
}
    
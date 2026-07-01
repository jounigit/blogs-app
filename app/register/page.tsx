"use client"

import { registerUser } from "@/app/actions/users"
import { useActionState, useEffect } from "react"
import { useNotification } from "../components/NotificationContext"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [state, formAction] = useActionState(
    registerUser, 
    { 
      errors: {}, 
      success: false,
      values: { username: "", name: "" } }
  )
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("User registered successfully!", "success")
      router.push("/login")
    } else if (Object.keys(state.errors).length > 0) {
      showNotification("Failed to register user. Please check the form for errors.", "error")
    }
  }, [state, showNotification, router])
  
  return (
    <div className="m-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <form action={formAction}>
        <div>
          <label>Username</label>
            <input 
              type="text" 
              name="username" 
              defaultValue={state.values?.username}
              required 
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          {state.errors?.username && <p className="text-red-600 text-sm">{state.errors?.username}</p>}
        </div>

        <div>
          <label>Name</label>
            <input 
             type="text" 
             name="name" 
             defaultValue={state.values?.name} 
             required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          {state.errors?.name && <p className="text-red-600 text-sm">{state.errors?.name}</p>}
        </div>

        <div>
          <label>Password</label>
            <input type="password" name="password" required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          {state.errors?.password && <p className="text-red-600 text-sm">{state.errors?.password}</p>}
        </div>

        <div>
          <label>Confirm Password</label>
            <input type="password" name="confirmPassword" required 
            className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          {state.errors?.confirmPassword && <p className="text-red-600 text-sm">{state.errors?.confirmPassword}</p>}
        </div>
        
        <button type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  )
}
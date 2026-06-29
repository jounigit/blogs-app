"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="m-4">
          <Link href="/" className="font-bold text-fg-brand hover:underline">
            home
          </Link>
          {" | "}
          <Link href="/blogs" className="font-bold text-fg-brand hover:underline">
            blogs
          </Link>
          {" | "}
          <Link href="/users" className="font-bold text-fg-brand hover:underline">
            users
          </Link>

      {" | "}

      {session ? (
        <>
          <Link href="/blogs/new" className="font-bold text-fg-brand hover:underline">
            create new
          </Link>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <>
          <Link href="/login" className="font-bold text-fg-brand hover:underline">
            login
          </Link>
          {" | "}
          <Link href="/register" className="font-bold text-fg-brand hover:underline">
            register
          </Link>
        </>
      )}
    </nav>
  )
}
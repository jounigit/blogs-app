"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center gap-4">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <NavLink href="/">
              home
            </NavLink>
          </div>
          
          <div className="md:flex md:items-center md:gap-12">
              <NavLink href="/blogs">
              blogs
            </NavLink>
            
            <NavLink href="/users">
              users
            </NavLink>     

            {session ? (
              <>
                <NavLink href="/blogs/new">
                  create new
                </NavLink>

                <NavLink href="/me">
                  me
                </NavLink>

                {/* <em className="text-gray-300">{session.user?.name} logged in</em>{" "} */}

                <button 
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
                >logout</button>
              </>
            ) : (
              <>
                <NavLink href="/login">
                  login
                </NavLink>
                
                <NavLink href="/register">
                  register
                </NavLink>
              </>
            )}
          </div>
          
    </nav>
  )
}

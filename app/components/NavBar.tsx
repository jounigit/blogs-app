"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center gap-4">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            
            <NavLink 
              href="/"
              exact
              className="hover:text-gray-300 [&.active]:underline"
            > 
              home 
            </NavLink>
          </div>
          
          <div className="md:flex md:items-center md:gap-12">
            <NavLink 
              name="blogs"
              href="/blogs"
              exact
              className="hover:text-gray-300 [&.active]:underline"
            > 
              blogs 
            </NavLink>

            <NavLink 
              name="users"
              href="/users"
              exact
              className="hover:text-gray-300 [&.active]:underline"
            > 
              users 
            </NavLink>     

            {/* session starts */}
            {session ? (
              <>
                <NavLink 
                  href="/blogs/new"
                  exact
                  className="hover:text-gray-300 [&.active]:underline"
                > 
                  create new 
                </NavLink>

                <NavLink 
                  name="me"
                  href="/me"
                  exact
                  className="hover:text-gray-300 [&.active]:underline"
                > 
                  me 
                </NavLink>               

                <button
                  name="logout"
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
                >
                  logout
                </button>
              </>
            ) : (
              <>
                <NavLink 
                  name="login"
                  href="/login"
                  exact
                  className="hover:text-gray-300 [&.active]:underline"
                > 
                  login 
                </NavLink> 

                <NavLink 
                  name="register"
                  href="/register"
                  exact
                  className="hover:text-gray-300 [&.active]:underline"
                > 
                  register 
                </NavLink>
              </>
            )}
            {/* session ends */}
          </div>
          
    </nav>
  )
}

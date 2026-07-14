// get request handler for /api/me with bearer token authentication
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization")
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

    const token = authorization.substring(7) // remove "Bearer " prefix
    // check if token is valid
    const user = await getUserByToken(token)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

  return NextResponse.json({ user })
}

// helper function to get user without passwordHash and token by token 
// join the user's blogs table as alias "createdBlogs" in the response
async function getUserByToken(token: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      passwordHash: false,
      token: false,
    },
    with: {
      blogs: {
        columns: {
          author: true,
          title: true,
          url: true,
        },
      },
    },
  })
  
  if (!user) return null
  
  // Rename blogs to createdBlogs
  const { blogs, ...rest } = user
  return { ...rest, createdBlogs: blogs }
}
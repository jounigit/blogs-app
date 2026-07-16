import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }
    
  try {
    const body = await req.json();
    const { username, name, password } = body as {
      username?: string;
      name?: string;
      password?: string;
    };

    if (!username || !name || !password) {
      return NextResponse.json(
        { error: "username, name, and password are required" },
        { status: 400 }
      );
    }

    if (typeof username !== "string" || typeof name !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "username, name, and password must be strings" },
        { status: 400 }
      );
    }

    if (username.length < 4) {
      return NextResponse.json(
        { error: "username must be at least 4 characters long" },
        { status: 400 }
      );
    }

    if (name.length < 4) {
      return NextResponse.json(
        { error: "name must be at least 4 characters long" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "username already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({ username, name, passwordHash })
      .returning({ id: users.id, username: users.username, name: users.name });

    return NextResponse.json(
      { success: true, user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
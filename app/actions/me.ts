"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { revalidatePath } from "next/cache"

export const generateTokenForUser = async () => {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    const token = crypto.randomUUID()

    await db.update(users)
        .set({ token })
        .where(eq(users.id, user.id))

    revalidatePath("/me")
}


import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogs, readingList, users } from "@/db/schema";

export async function DELETE() {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }
    
  try {
    await db.delete(readingList);
    await db.delete(blogs);
    await db.delete(users);

    return NextResponse.json({
      success: true,
      message: "All data deleted from all tables.",
    });
  } catch (error) {
    console.error("Failed to reset database:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete data from the database.",
      },
      { status: 500 }
    );
  }
}
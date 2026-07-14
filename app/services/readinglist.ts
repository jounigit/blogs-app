// get readinglist by userId
import { db } from "@/db";
import { readingList } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getReadinglist = async () => {
  return db.select().from(readingList);
}

export const getReadingListByUserId = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      user: true,
      blog: true,
    },
  });
}  

export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingList).values({
    userId,
    blogId,
  });
}

export const readBlog = async (userId: number, blogId: number) => {
  const entry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  });
  // If the entry exists, update the read status to true
  if (entry) {
    await db.update(readingList).set({ read: true }).where(eq(readingList.id, entry.id));
  }
}

// export const removeFromReadingList = async (userId: number, blogId: number) => {
//   await db.delete(readingList).where(
//     eq(readingList.userId, userId),
//     eq(readingList.blogId, blogId)
//   );
// }
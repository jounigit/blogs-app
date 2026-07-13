// get readinglist by userId
import { db } from "@/db";
import { readingList } from "@/db/schema";
import { eq } from "drizzle-orm";

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

// export const removeFromReadingList = async (userId: number, blogId: number) => {
//   await db.delete(readingList).where(
//     eq(readingList.userId, userId),
//     eq(readingList.blogId, blogId)
//   );
// }
import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";

export async function createFeed(feedName: string, feedURL: string, userId: string) {
  const [result] = await db.insert(feeds).values({
    name: feedName,
    url: feedURL,
    user_id: userId
  }).returning();

  return result;
}

export async function getFeeds() {
  const result = await db.select({
    feed_name: feeds.name,
    url: feeds.url,
    user_name: users.name
  }).from(feeds).innerJoin(users, eq(feeds.user_id, users.id));

  return result;
}

export async function getFeedByURL(feedURL:string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, feedURL))
  return result;
}
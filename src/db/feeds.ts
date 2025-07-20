import { RSSFeed } from "src/rss";
import { db } from ".";
import { feeds } from "./schema";

export async function createFeed(feedName: string, feedURL: string, userId: string) {

  

  const [result] = await db.insert(feeds).values({
    name: feedName,
    url: feedURL,
    user_id: userId
  }).returning();

  
  
  return result;
}

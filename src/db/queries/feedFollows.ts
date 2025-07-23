import { db } from "..";
import { eq, and } from "drizzle-orm"
import { feedFollows, feeds, users } from "../schema";
import { getUserByName } from "./users";
import { getFeedByURL } from "./feeds";

export async function createFeedFollow(userID: string, feedID: string) {
  const [newFeedFollow] = await db.insert(feedFollows).values({
    user_id: userID,
    feed_id: feedID
  }).returning();

  const [result] = await db.select({
    feedFollow: feedFollows,
    user_name: users.name,
    feed_name: feeds.name
  })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.user_id, users.id))
    .innerJoin(feeds, eq(feedFollows.feed_id, feeds.id))
    .where(
      and(
        eq(feedFollows.feed_id, newFeedFollow.feed_id), eq(feedFollows.user_id, newFeedFollow.user_id)
      )
    );

  return result;
}

export async function getFeedFollowsForUser(userName: string) {
  const userID = (await getUserByName(userName)).id
  const result = await db.select()
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.user_id, users.id))
    .innerJoin(feeds, eq(feedFollows.feed_id, feeds.id))
    .where(eq(feedFollows.user_id, userID));

  return result;
}

export async function delFeedFollow(userID: string, feedID: string) {
  const [result] = await db.delete(feedFollows)
    .where(
      and(
        eq(feedFollows.user_id, userID), eq(feedFollows.feed_id, feedID)
      ))
    .returning();

  return result;

}
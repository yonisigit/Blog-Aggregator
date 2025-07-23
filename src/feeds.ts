import { readConfig } from "./config";
import { createFeedFollow } from "./db/queries/feedFollows";
import { createFeed, getFeeds } from "./db/queries/feeds";
import { getUserByName } from "./db/queries/users";
import { Feed, User } from "./db/schema";

export async function handlerAddFeed(cmdName: string, user: User, ...cmdArgs: string[]) {
  if (cmdArgs.length !== 2) {
    throw new Error(`usage: ${cmdName} <feed_name> <url>`);
  }
  const feedName = cmdArgs[0];
  const feedURL = cmdArgs[1];

  const feed = await createFeed(feedName, feedURL, user.id);
  if (!feed) {
    throw new Error(`Failed to create feed`);
  }

  await createFeedFollow(user.id, feed.id);

  printFeed(feed, user);
}

export async function handlerFeeds(cmdName: string, ...cmdArgs: string[]) {
  const feeds = await getFeeds();
  for (const feed of feeds){
    console.log(feed);
  }
  
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}

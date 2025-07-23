import { readConfig } from "./config";
import { createFeedFollow, delFeedFollow, getFeedFollowsForUser } from "./db/queries/feedFollows";
import { getFeedByURL } from "./db/queries/feeds";
import { getUserByName } from "./db/queries/users";
import { User } from "./db/schema";

export async function handlerFollow(cmdName:string, user: User, ...cmdArgs: string[]){
  if (cmdArgs.length < 1){
    throw new Error("must provide url");
  }

  const feedURL = cmdArgs[0];
  const feed = await getFeedByURL(feedURL);

  await createFeedFollow(user.id, feed.id);

  printFeedFollow(user.name, feed.name);
}

export async function handlerFollowing(cmdName:string, user: User, ...cmdArgs: string[]){
  const followingFeeds = await getFeedFollowsForUser(user.name);
  for (const feed of followingFeeds){
    console.log(feed.feeds.name);
  }
}

export async function handlerUnfollow(cmdName:string, user: User, ...cmdArgs: string[]){
  if (cmdArgs.length !== 1){
    throw new Error("must provide feed url");
  }
  const feedURL = cmdArgs[0];
  const feed = await getFeedByURL(feedURL);

  await delFeedFollow(user.id, feed.id);
}

export function printFeedFollow(username: string, feedname: string) {
  console.log(`* User:          ${username}`);
  console.log(`* Feed:          ${feedname}`);
}
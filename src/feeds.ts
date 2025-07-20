import { readConfig } from "./config";
import { createFeed } from "./db/feeds";
import { getUserByName } from "./db/queries/users";
import { Feed, User } from "./db/schema";

export async function handlerAddFeed(cmdName: string, ...cmdArgs: string[]) {
  console.log("in addfeed");

  const feedName = cmdArgs[0];
  const feedURL = cmdArgs[1];
  const config = readConfig();
  const userName = config.currentUserName;
  const user = await getUserByName(userName);
  const userID = user.id;

  const feed = await createFeed(feedName, feedURL, userID);

  printFeed(feed, user);
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}

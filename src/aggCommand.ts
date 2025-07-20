import { fetchFeed } from "./rss";

export async function handlerAggregate(cmdName: string, ...args: string[]) {
  const rss = await fetchFeed("https://www.wagslane.dev/index.xml");

  console.log(JSON.stringify(rss, null, 2));
}
import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
  const resp = await fetch(feedURL, {
    method: "GET",
    headers: {
      "User-Agent": "gator",
      accept: "application/rss+xml"
    }
  });
  if (!resp.ok) {
    throw new Error(`failed to fetch feed: ${resp.status} ${resp.statusText}`);
  }

  const respText = await resp.text();
  const parser = new XMLParser();
  const rssObj = parser.parse(respText);

  const channel = rssObj.rss?.channel;
  if (!channel || !channel.title || !channel.link || !channel.description || !channel.item) {
    throw new Error("failed to parse channel");
  }

  const items = Array.isArray(channel.item) ? channel.item : [];

  const rssItems: RSSItem[] = [];

  for (const item of items){
    if(!item.title || !item.link || !item.description || !item.pubDate){
      continue;
    }

    rssItems.push({
      title: item.title,
      link: item.link,
      description: item.description,
      pubDate: item.pubDate
    });
  }

  const rss: RSSFeed = {
    channel: {
      title: channel.title,
      link: channel.link,
      description: channel.description,
      item: rssItems     
    }   
  }

  return rss;
}
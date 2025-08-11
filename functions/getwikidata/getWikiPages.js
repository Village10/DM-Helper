import * as cheerio from "cheerio";
import axiosCall from "../utils/axiosCall.js";

export default async function getWikiPages() {
  const deepLinks = [
    "Unearthed Arcana",
    "Feats",
    "All Spells",
    "All Species",
    "All Backgrounds",
  ];

  // TODO: Use sitemap

  async function fetchLinks(temp, link) {
    const res = await axiosCall("http://dnd2024.wikidot.com" + link);
    const cheerioData = cheerio.load(res.data);
    cheerioData(".main-content a").each((index, element) => {
      const href = cheerioData(element).attr("href");
      if (href &&
          href.startsWith("/") &&
          !href.startsWith("/home") &&
          !cheerioData(element).hasClass("newpage")
      ) {
        temp[cheerioData(element).text().trim()] = href;
      }
    });
    return temp;
  }

  const links = {};
  await fetchLinks(links, "");
  const linkKeys = Object.keys(links);
  for (const link of linkKeys) {
    if (deepLinks.includes(link)) {
      await fetchLinks(links, links[link]);
    }
  }
  return Object.keys(links).map((linkKey) => {
    return { name: linkKey, url: links[linkKey] };
  });
}

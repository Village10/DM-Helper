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

  async function fetchLinks(link) {
    const temp = [];
    const res = await axiosCall("http://dnd2024.wikidot.com" + link);
    const cheerioData = cheerio.load(res.data);
    cheerioData(".main-content a").each((index, element) => {
      const href = cheerioData(element).attr("href");
      if (href &&
          href.startsWith("/") &&
          !href.startsWith("/home") &&
          !cheerioData(element).hasClass("newpage")
      ) {
        temp.push({
          name: cheerioData(element).text().trim(),
          url: href,
        });
      }
    });
    return temp;
  }

  const final = await fetchLinks("");
  for (const link of final) {
    if (deepLinks.includes(link["name"])) {
      final.push(...await fetchLinks(link["url"]));
    }
  }
  return final;
}

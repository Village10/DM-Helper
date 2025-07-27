import * as cheerio from "cheerio";
import axiosCall from "../utils/axiosCall.js";

export default async function getMonsters() {
  const res = await axiosCall("https://www.aidedd.org/dnd-filters/monsters.php");
  if (res) {
    const cheerioData = cheerio.load(res.data);
    return cheerioData("tbody tr td.item").map( (i, element) => {
      const firstLink = cheerioData(element).find("a").first();
      return {
        name: firstLink.text(),
        url: firstLink.attr("href"),
      };
    }).get();
  } else {
    console.error("Resolution is null when getting monsters");
    return [];
  }
}

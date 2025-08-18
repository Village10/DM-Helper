import * as cheerio from "cheerio";
import axiosCall from "../utils/axiosCall";

export default async function getWikiPage(link: {name: string, url: string}) {
  try {
    const res = await axiosCall("http://dnd2024.wikidot.com" + link.url);

    const cheerioData = cheerio.load(res?.data);

    // Get tags in breadcrumbs
    const tags: string[] = [];
    const breadcrumbs = cheerioData(".breadcrumbs a");
    if (breadcrumbs.length === 2) {
      const text = cheerioData(breadcrumbs[1]).text().trim();
      switch (text) {
        case "Species":
          tags.push("species");
          break;
        case "Backgrounds":
          tags.push("background");
          break;
        default:
          break;
      }
    }

    // Remove breadcrumbs
    cheerioData(".main-content .breadcrumbs").remove();

    // Remove scripts
    cheerioData("script").remove();

    // Get tags in page-tags
    cheerioData(".page-tags").first().find("a").each((_index, tag) => {
      tags.push(cheerioData(tag).text());
    });

    // Convert links to text
    cheerioData("a").each((_index, element) => {
      cheerioData(element).replaceWith(cheerioData(element).text());
    });

    // For yui navigation menus
    cheerioData("div[id^=\"wiki-tabview-\"]").each((_index, element) => {
      const $element = cheerioData(element);


      // Get list of navigation tabs
      const tabList = $element.find(".yui-nav li")
          .map((_index, el) => cheerioData(el).text()).get();

      // Remove navigation tab links
      $element.find(".yui-nav").remove();

      // Make tables visible
      $element.find("div[id^=\"wiki-tab-\"]").each((index, tabElement) => {
        const $div = cheerioData(tabElement);

        // Set display to block
        $div.attr("style", "display: block;");

        // Add the header
        $div.before(`<h3>${tabList[index]}</h3>`);
      });
    });

    // Page title size and underline
    cheerioData(".page-title").attr(
        "style",
        "font-size: 32px; border-bottom: 3px solid;",
    );

    // Table attributes
    cheerioData("table").each((_index, table) => {
      cheerioData(table).attr(
          "style",
          "border-collapse: collapse; width: 100%; margin: 20px 0; font-size: 14px;",
      );
    });

    // Table header attributes
    cheerioData("table th").each((_index, th) => {
      cheerioData(th).attr(
          "style",
          "border: 1px solid #ddd; padding: 8px; text-align: left;",
      );
    });

    // Table body attributes
    cheerioData("table td").each((_index, td) => {
      cheerioData(td).attr(
          "style",
          "border: 1px solid #ddd; padding: 8px; text-align: left;",
      );
    });

    // Remove tags from html
    cheerioData(".page-tags").remove();

    return {
      name: link.name,
      tags: tags,
      html: cheerioData(".main-content").html(),
    };
  } catch (error) {
    console.log(error);
  }
}

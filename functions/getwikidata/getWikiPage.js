import * as cheerio from "cheerio";
import axiosCall from "../utils/axiosCall.js";

export default async function getWikiPage(link) {
  try {
    const res = await axiosCall("http://dnd2024.wikidot.com" + link.url);


    const cheerioData = cheerio.load(res.data);

    // Remove breadcrumbs
    cheerioData(".main-content .breadcrumbs").remove();

    // Remove scripts
    cheerioData("script").remove();

    // Get tags in page-tags
    const tags = [];
    cheerioData(".page-tags").first().find("a").each((i, tag) => {
      tags.push(cheerioData(tag).text());
    });

    // Convert links to text
    cheerioData("a").each((index, element) => {
      cheerioData(element).replaceWith(cheerioData(element).text());
    });

    // For yui navigation menus
    cheerioData("div[id^=\"wiki-tabview-\"]").each((index, element) => {
      const $element = cheerioData(element);


      // Get list of navigation tabs
      const tabList = $element.find(".yui-nav li")
          .map((i, el) => cheerioData(el).text()).get();

      // Remove navigation tab links
      $element.find(".yui-nav").remove();

      // Make tables visible
      $element.find("div[id^=\"wiki-tab-\"]").each((tabIndex, tabElement) => {
        const $div = cheerioData(tabElement);

        // Set display to block
        $div.attr("style", "display: block;");

        // Add the header
        $div.before(`<h3>${tabList[tabIndex]}</h3>`);
      });
    });

    // Page title size and underline
    cheerioData(".page-title").attr(
        "style",
        "font-size: 32px; border-bottom: 3px solid;",
    );

    // Table attributes
    cheerioData("table").each((i, table) => {
      cheerioData(table).attr(
          "style",
          "border-collapse: collapse; width: 100%; margin: 20px 0; font-size: 14px;",
      );
    });

    // Table header attributes
    cheerioData("table th").each((i, th) => {
      cheerioData(th).attr(
          "style",
          "border: 1px solid #ddd; padding: 8px; text-align: left;",
      );
    });

    // Table body attributes
    cheerioData("table td").each((i, td) => {
      cheerioData(td).attr(
          "style",
          "border: 1px solid #ddd; padding: 8px; text-align: left;",
      );
    });

    return {
      name: link.name,
      tags: tags,
      html: cheerioData(".main-content").html(),
    };
  } catch (error) {
    console.log(error);
  }
}

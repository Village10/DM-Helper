import axiosCall from "../utils/axiosCall.js";
import * as cheerio from "cheerio";

export default async function getMonster(monster) {
  const res = await axiosCall(monster.url);
  if (res.data) {
    const cheerioData = cheerio.load(
        cheerio.load(res.data)("body").first().html(),
    );
    const source = cheerioData(".source").first().text();

    cheerioData("h1").remove();
    cheerioData("body").prepend(`<h1>${monster.name}</h1>`);

    // Page title size and underline
    cheerioData("h1").attr(
        "style",
        "font-size: 32px; border-bottom: 3px solid;",
    );

    // Columns
    cheerioData(".col").attr(
        "style",
        "display: grid; grid-template-columns: 1fr 1fr; gap: 20px",
    );
    cheerioData("head").append(`
            <style>
            @media (max-width: 899px) {
              .col {
                grid-template-columns: 1fr !important;
              }
            }
          </style>
        `);

    // Format picture if there is one
    cheerioData(".col2").each((i, element) => {
      const $element = cheerioData(element);

      if ($element.children().length === 0) {
        $element.html("<div class=\"picture\"><h2 >No<br>Image</h2></div>");
      }
    });

    cheerioData(".picture img").attr(
        "style",
        "border: 2px solid red; width: 304px; height: auto; max-width: 75%;  margin: 0 auto;",
    );
    cheerioData(".picture h2").attr(
        "style",
        "border: 2px solid red; width: 304px; height: auto; max-width: 75%;  margin: 0 auto; padding: 35px",
    );
    cheerioData(".picture").attr(
        "style",
        "text-align: center; width: 100%;",
    );

    // Convert svgs to lines
    cheerioData("svg").replaceWith("<hr>");

    // Remove links to other languages
    cheerioData(".trad").remove();

    // Remove breadcrumbs
    cheerioData("ol[itemscope][itemtype=\"http://schema.org/BreadcrumbList\"]").remove();

    // Remove empty div
    cheerioData(".orange").remove();

    // Style attributes
    cheerioData(".carac").attr(
        "style",
        "display: inline-block; width: 16.6%; text-align: center",
    );

    // Style subheadings
    cheerioData(".rub").attr(
        "style",
        "border-bottom: 2px solid; font-variant: small-caps; margin: 6px 0 4px 0; font-size: 1.5rem",
    );

    // Add "Source:" to sources
    cheerioData(".source").prepend("<Strong>Source: </Strong>");

    // Set width to 75% and center
    cheerioData.root().wrapInner(
        "<div style=\"width: 75%; margin: 0 auto;\" ></div>",
    );

    // Convert links to text
    cheerioData("a").each((index, element) => {
      cheerioData(element).replaceWith(cheerioData(element).text());
    });

    return {
      name: monster.name,
      html: cheerioData.html(),
      tags: [source, "Monster"],
    };
  } else {
    return null;
  }
}

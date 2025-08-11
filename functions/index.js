import { onSchedule } from "firebase-functions/v2/scheduler";
import getMonsters from "./getwikidata/getMonsters.js";
import getWikiPages from "./getwikidata/getWikiPages.js";
import getWikiPage from "./getwikidata/getWikiPage.js";
import getMonster from "./getwikidata/getMonster.js";
import { processBatches, toStorable } from "./utils/misc.js";
import { db } from "./utils/firebase.js";

export const getWikiData = onSchedule(
    { schedule: "0 0 * * 0", timeoutSeconds: 600 },
    async () => {
      const monstersUrls = await getMonsters();
      const wikiUrls = await getWikiPages();
      const index = [];

      // Get each wiki pages
      const wikiPagePromises = wikiUrls.map(async (page, i) => {
        await new Promise((resolve) => setTimeout(resolve, i * 100));
        return getWikiPage(page);
      });

      // Get monster pages
      const monsterPromises = monstersUrls.map(async (monster, i) => {
        await new Promise((resolve) => setTimeout(resolve, i * 100));
        return getMonster(monster);
      });

      const allPages = await Promise.all([...wikiPagePromises, ...monsterPromises]);

      const batches = await processBatches(allPages, 500);

      // Save wiki data to firestore
      for (const batch of batches) {
        const firebaseBatch = db.batch();

        batch.forEach((page) => {
          index.push({
            name: page.name,
            tags: page.tags,
          });
          firebaseBatch.set(
              db.collection("wiki-data").doc(toStorable(page.name)),
              { html: page.html },
          );
        });

        await firebaseBatch.commit();
      }

      // Save index to firestore
      await db.collection("wiki-data").doc("index").set(
          { "index": index.sort((a, b) => a.name.localeCompare(b.name)) },
      );
    },
);

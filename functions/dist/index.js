"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWikiData = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const getMonsters_1 = __importDefault(require("./getwikidata/getMonsters"));
const getWikiPages_1 = __importDefault(require("./getwikidata/getWikiPages"));
const getWikiPage_1 = __importDefault(require("./getwikidata/getWikiPage"));
const getMonster_1 = __importDefault(require("./getwikidata/getMonster"));
const misc_1 = require("./utils/misc");
const firebase_1 = require("./utils/firebase");
exports.getWikiData = (0, scheduler_1.onSchedule)({ schedule: "0 0 * * 0", timeoutSeconds: 600 }, async () => {
    const monstersUrls = await (0, getMonsters_1.default)();
    const wikiUrls = await (0, getWikiPages_1.default)();
    const index = [];
    // Get each wiki pages
    const wikiPagePromises = wikiUrls.map(async (page, i) => {
        await new Promise((resolve) => setTimeout(resolve, i * 100));
        return (0, getWikiPage_1.default)(page);
    });
    // Get monster pages
    const monsterPromises = monstersUrls.map(async (monster, i) => {
        await new Promise((resolve) => setTimeout(resolve, i * 100));
        return (0, getMonster_1.default)(monster);
    });
    const allPages = await Promise.all([...wikiPagePromises, ...monsterPromises]);
    const cleanedPages = allPages
        .filter((i) => i?.html != null)
        .map((i) => ({ ...i, html: i.html }));
    const batches = await (0, misc_1.processBatches)(cleanedPages, 500);
    // Save wiki data to firestore
    for (const batch of batches) {
        const firebaseBatch = firebase_1.db.batch();
        batch.forEach((page) => {
            index.push({
                name: page.name,
                tags: page.tags,
            });
            firebaseBatch.set(firebase_1.db.collection("wiki-data").doc((0, misc_1.toStorable)(page.name)), { html: page.html });
        });
        await firebaseBatch.commit();
    }
    // Save index to firestore
    await firebase_1.db.collection("wiki-data").doc("index").set({ "index": index.sort((a, b) => a.name.localeCompare(b.name)) });
});

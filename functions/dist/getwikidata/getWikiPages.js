"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const axiosCall_1 = __importDefault(require("../utils/axiosCall"));
async function getWikiPages() {
    const deepLinks = [
        "Unearthed Arcana",
        "Feats",
        "All Spells",
        "All Species",
        "All Backgrounds",
    ];
    // FEATURE: Use sitemap
    async function fetchLinks(temp, link) {
        const res = await (0, axiosCall_1.default)("http://dnd2024.wikidot.com" + link);
        const cheerioData = cheerio.load(res?.data);
        cheerioData(".main-content a").each((_index, element) => {
            const href = cheerioData(element).attr("href");
            if (href &&
                href.startsWith("/") &&
                !href.startsWith("/home") &&
                !cheerioData(element).hasClass("newpage")) {
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
exports.default = getWikiPages;

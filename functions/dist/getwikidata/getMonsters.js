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
async function getMonsters() {
    const res = await (0, axiosCall_1.default)("https://www.aidedd.org/dnd-filters/monsters.php");
    if (res) {
        const cheerioData = cheerio.load(res.data);
        return cheerioData("tbody tr td.item").map((_index, element) => {
            const firstLink = cheerioData(element).find("a").first();
            return {
                name: firstLink.text(),
                url: firstLink.attr("href"),
            };
        }).get();
    }
    else {
        console.error("Resolution is null when getting monsters");
        return [];
    }
}
exports.default = getMonsters;

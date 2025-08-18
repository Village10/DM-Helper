"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processBatches = exports.toStorable = void 0;
function toStorable(string) {
    return string
        .trim()
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("/", "_");
}
exports.toStorable = toStorable;
async function processBatches(items, batchSize) {
    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
        batches.push(items.slice(i, i + batchSize));
    }
    return batches;
}
exports.processBatches = processBatches;

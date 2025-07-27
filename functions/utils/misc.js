
export function toStorable(string) {
    return string
        .trim()
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("/", "_");
}

export async function processBatches(items, batchSize) {
    let batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
        batches.push(items.slice(i, i + batchSize));
    }
    return batches;
}
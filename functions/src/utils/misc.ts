
export function toStorable(string: string) {
  return string
      .trim()
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("/", "_");
}


export async function processBatches(
    items: {
        name: string,
        tags: string[],
        html: string,
    }[],
    batchSize: number,
) {
  const batches: { name: string; tags: string[]; html: string }[][] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }
  return batches;
}

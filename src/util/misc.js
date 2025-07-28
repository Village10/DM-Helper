
export function toStorable(string) {
  return string
      .trim()
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("/", "_");
}
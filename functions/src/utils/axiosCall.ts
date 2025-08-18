import axios from "axios";

const defaultHeaders = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
  "Connection": "keep-alive",
};

export default async function axiosCall(url: string) {
  try {
    return await axios.get(url, {
      headers: defaultHeaders,
    });
  } catch (e: unknown) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      return await axios.get(url, {
        headers: defaultHeaders,
      });
    } catch (e2: unknown) {
      console.error("First Error: \n" + (e instanceof Error ? e.message : "Not Error"));
      console.error("Second Error: \n" + (e2 instanceof Error ? e2.message : "Not Error"));
      return null;
    }
  }
}

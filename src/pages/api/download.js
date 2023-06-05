import { kv } from "@vercel/kv";
const KeyDownloadCounter = "downloadCounter";
const KeyViewCounter = "viewCounter";
export default async function handler(req, res) {
  const fetchDownloadCounter = (await kv.get(KeyDownloadCounter)) ?? 0;
  const updateDC = await kv.set(KeyDownloadCounter, fetchDownloadCounter + 1);
  res.status(200).json({ download: "OK" });
}

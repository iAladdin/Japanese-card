import { kv } from "@vercel/kv";

const KeyViewCounter = "viewCounter";
const KeyDownloadCounter = "downloadCounter";

const UsageCounter = async () => {
  const fetchViewCounter = (await kv.get(KeyViewCounter)) ?? 0;
  const fetchDownloadCounter = (await kv.get(KeyDownloadCounter)) ?? 0;
  const updateVC = await kv.set(KeyViewCounter, fetchViewCounter + 1);
  return (
    <div
      class="flex justify-center items-center bg-gray-800 text-white-30 font-bold"
      style={{
        fontFamily: "Electroharmonix",
      }}
    >
      {fetchViewCounter} views / {fetchDownloadCounter} downloads
    </div>
  );
};
export default UsageCounter;

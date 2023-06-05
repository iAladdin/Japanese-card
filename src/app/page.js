import Image from "next/image";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(() => import("./components/MarkdownEditor"), {
  ssr: false,
});

const UsageCounter = dynamic(() => import("./components/Counter"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex pb-100 flex-col items-center justify-between p-6 sm:max-lg:p-24">
      <MarkdownEditor />
      <UsageCounter />
    </main>
  );
}

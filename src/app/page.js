import Image from "next/image";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(() => import("./components/MarkdownEditor"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:max-lg:p-24">
      <MarkdownEditor />
    </main>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { useSearchParams } from "next/navigation";
import { themes } from "../configs/themes";

const MarkdownEditor = () => {
  const searchParams = useSearchParams();
  const [text, setText] = useState("");

  const [theme, setTheme] = useState("default");

  const fullText =
    "#  Hey guys \n## Can't you read this Sentence? \nwhy can't? 'Cause you are Japanese";

  useEffect(() => {
    let index = 0;

    const initialText = searchParams.get("content")
      ? decodeURIComponent(searchParams.get("content"))
      : fullText;

    const intervalId = setInterval(() => {
      if (index < initialText.length - 1) {
        setText((prevText) => prevText + initialText[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [searchParams]);

  const renderThemeButtons = () => {
    return Object.keys(themes).map((themeKey) => (
      <button
        key={themeKey}
        onClick={() => setTheme(themeKey)}
        className="rounded-lg"
        style={{ ...themes[themeKey] }}
      >
        {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
      </button>
    ));
  };

  const downloadImage = () => {
    const node = document.getElementById("markdown-content");

    const pixelRatio = window.devicePixelRatio || 1;

    toPng(node, {
      width: node.clientWidth * pixelRatio,
      height: node.clientHeight * pixelRatio,
      style: {
        transform: `scale(${pixelRatio})`,
        transformOrigin: "top left",
        width: `${node.clientWidth}px`,
        height: `${node.clientHeight}px`,
      },
    })
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        saveAs(dataUrl, "markdown.png");
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div className="relative flex flex-col place-items-center max-w-4xl min-w-full md:min-w-[480px]">
      <div
        id="markdown-content"
        className="block w-full min-h-[100px] mb-6 p-6 line-break-anywhere whitespace-pre-wrap bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        style={{ fontFamily: "Electroharmonix", ...themes[theme] }}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>

      <div
        style={{ fontFamily: "Electroharmonix" }}
        className="flex flex-row justify-between w-full mb-6"
      >
        {renderThemeButtons()}
      </div>
      <div> Please input the content:</div>
      <textarea
        onChange={(event) => setText(event.target.value)}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={text}
        style={{ width: "100%", minHeight: "200px" }}
      />

      <button
        onClick={downloadImage}
        style={{ fontFamily: "Electroharmonix" }}
        className="flex rounded p-2 border border-gray-300 m-6"
      >
        💾 Save Card Image
      </button>
    </div>
  );
};

export default MarkdownEditor;

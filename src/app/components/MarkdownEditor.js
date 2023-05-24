"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";

const MarkdownEditor = () => {
  const router = useRouter();
  const [text, setText] = useState("");

  const [theme, setTheme] = useState("default"); // 新增的状态

  const fullText =
    "#  Hey guys \n## Can't you read this Sentence? \nwhy can't 'Cause you are Japanese";

  useEffect(() => {
    let index = 0;
    // if (router.query == undefined) return null;

    const initialText = router.query
      ? decodeURIComponent(router.query.content)
      : fullText;

    // 每隔100毫秒添加一个字符
    const intervalId = setInterval(() => {
      if (index < fullText.length - 1) {
        setText((prevText) => prevText + initialText[index]);
        index++;
      } else {
        // 当所有的字符都被添加后，停止间隔函数
        clearInterval(intervalId);
      }
    }, 60); // 这里的数字可以调整，数字越小打字效果越快

    // 当组件卸载时，清除间隔函数
    return () => clearInterval(intervalId);
  }, [router]);

  // 定义三种主题颜色的样式
  const themes = {
    default: {
      backgroundColor: "white",
      border: "4px solid gray",
      color: "black",
    },
    matrix: {
      backgroundColor: "black",
      border: "4px solid green",
      color: "lime",
    },
    japanese: {
      backgroundColor: "#F4A261",
      border: "4px solid #E76F51",
      color: "#264653",
    },
    classic: {
      backgroundColor: "black",
      border: "4px solid red",
      color: "red",
    },
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

  const shareToTwitter = () => {
    // 获取图像 URL 或 base64
    const imageUrl = "url_to_your_image";

    // 创建分享到 Twitter 的链接
    const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${imageUrl}`;

    // 在新标签页中打开链接
    window.open(tweetLink, "_blank");
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
        <button
          onClick={() => setTheme("default")}
          className="rounded-lg"
          style={{ ...themes["default"] }}
        >
          Default
        </button>
        <button
          onClick={() => setTheme("matrix")}
          className="rounded-lg"
          style={{ ...themes["matrix"] }}
        >
          Matrix
        </button>
        <button
          onClick={() => setTheme("japanese")}
          className="rounded-lg"
          style={{ ...themes["japanese"] }}
        >
          Japanese
        </button>
        <button
          onClick={() => setTheme("classic")}
          className="rounded-lg"
          style={{ ...themes["classic"] }}
        >
          Classic
        </button>
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
      {/* <button onClick={shareToTwitter}>Share to Twitter</button> */}
    </div>
  );
};

export default MarkdownEditor;

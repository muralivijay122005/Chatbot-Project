"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import rehypeRaw from "rehype-raw";
import CodeBlock from "./CodeBlock";

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: false,
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatsProps {
  messages: Message[];
}

export default function Chats({ messages }: ChatsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && typeof window !== "undefined") {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 select-text space-y-5">
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        const isLoading = message.content === "___loading___";

        if (isLoading) {
          return (
            <div key={index} className="flex justify-start">
              <div className="w-full py-7 space-y-2 animate-pulse">
                <div className="relative h-4 w-3/4 bg-neutral-700/70 rounded overflow-hidden">
                  <div className="absolute inset-0 shimmer" />
                </div>
                <div className="relative h-4 w-[60%] bg-neutral-700/70 rounded overflow-hidden">
                  <div className="absolute inset-0 shimmer" />
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`text-sm sm:text-base text-neutral-300 break-words whitespace-pre-wrap ${
                isUser
                  ? "bg-neutral-900 rounded-lg px-4 py-2 max-w-[70%] leading-6"
                  : "w-full py-7 leading-7"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkParse, remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ className = "", children, ...props }) {
                    const rawContent = String(children).trim();
                    const isMultiline = rawContent.includes("\n");
                    const match = /language-(\w+)/.exec(className);
                    let language = match?.[1];

                    const fallbackLangList = [
                      "js",
                      "javascript",
                      "ts",
                      "typescript",
                      "html",
                      "css",
                      "json",
                      "python",
                      "py",
                      "java",
                      "c",
                      "cpp",
                      "bash",
                      "sh",
                    ];

                    if (!language && isMultiline) {
                      const [firstLine, ...rest] = rawContent.split("\n");
                      const firstLineLower = firstLine.trim().toLowerCase();
                      if (fallbackLangList.includes(firstLineLower)) {
                        language = firstLineLower;
                        return (
                          <CodeBlock
                            language={language}
                            value={rest.join("\n").trim()}
                          />
                        );
                      }
                    }

                    if (isMultiline) {
                      return (
                        <CodeBlock
                          language={language || "plaintext"}
                          value={rawContent}
                        />
                      );
                    }

                    return (
                      <code
                        className="bg-orange-950/30 text-orange-300 font-mono text-sm rounded px-2 py-0.5"
                        {...props}
                      >
                        {rawContent}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        );
      })}

      <div ref={scrollRef} />
    </div>
  );
}

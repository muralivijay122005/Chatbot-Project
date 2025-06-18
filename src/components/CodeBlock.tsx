"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FiCopy } from "react-icons/fi";
import hljs from "highlight.js/lib/common";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);

const cleanedOneDark = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "transparent",
    fontFamily: "var(--font-mono)",
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
    fontFamily: "var(--font-mono)",
  },
};

type Props = {
  language?: string;
  value: string;
};

const CodeBlock: React.FC<Props> = ({ language, value }) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  let finalLang = language || "plaintext";

  // Optional auto-detect if no language provided
  if (!language || language === "plaintext") {
    const result = hljs.highlightAuto(value);
    finalLang = result.language || "plaintext";
  }

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden bg-neutral-900/50 border border-neutral-800 text-sm">
      <div className="ps-5 py-3 capitalize text-neutral-400 text-sm tracking-wide font-sans">
        {finalLang}
      </div>

      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 hover:bg-neutral-800 rounded-md font-sans flex items-center gap-2 text-neutral-400 hover:text-white transition pb-1 ps-2 pe-3 pt-1"
        aria-label="Copy code"
      >
        <FiCopy size={16} />
        Copy
      </button>

      {showCopied && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-none">
          <div className="bg-neutral-900 flex flex-row items-center gap-3 font-sans text-neutral-300 px-5 py-3 rounded-md shadow-md animate-fade-in-out">
            <FiCopy size={16} />
            Copied Successfully
          </div>
        </div>
      )}

      <div className="max-h-[500px] scrollbar-visible overflow-auto text-sm leading-relaxed">
        <SyntaxHighlighter
          language={finalLang}
          style={cleanedOneDark}
          wrapLines
          wrapLongLines
          className="code-wrap"
          codeTagProps={{
            style: {
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            },
          }}
          customStyle={{
            background: "transparent",
            margin: 0,
            padding: "1rem",
            borderRadius: "0 0 0.75rem 0.75rem",
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;

"use client";
import React, { useState, useRef, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoIosTimer } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";

interface PromptInputProps {
  onSend: (prompt: string) => void;
}

const PromptInputBar: React.FC<PromptInputProps> = ({ onSend }) => {
  const [prompt, setPrompt] = useState("");
  const [inputHeight, setInputHeight] = useState(44);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setInputHeight(textareaRef.current.scrollHeight);
    }
  }, [prompt]);

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSend(prompt);
      setPrompt("");
      setInputHeight(44); // Reset height
    }
  };

  return (
    <div
      className="w-full max-w-2xl bg-neutral-900 rounded-3xl mx-auto text-neutral-400 flex flex-col gap-3 p-4"
      style={{
        paddingTop: inputHeight > 60 ? "1.5rem" : "1rem", // top space like ChatGPT
        transition: "padding 0.2s ease-in-out",
      }}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        placeholder="How can I assist today?"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="bg-transparent scrollbar-visible resize-none outline-none text-white placeholder-neutral-500 text-md p-1 px-2 rounded w-full max-h-40 overflow-y-auto"
        aria-label="Question input"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm hover:text-neutral-300 border border-neutral-800 p-1.5 px-3 rounded-3xl hover:bg-neutral-800 transition-colors">
            <GrAttachment size={14} />
            <span>Attach</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm hover:text-neutral-300 border border-neutral-800 p-1.5 px-3 rounded-3xl hover:bg-neutral-800 transition-colors">
            <IoIosTimer size={16} />
            <span>Temporary</span>
          </button>
        </div>

        <button
          className="bg-indigo-500 text-white p-2 rounded-3xl hover:bg-indigo-500/50 disabled:opacity-50"
          aria-label="Submit question"
          disabled={!prompt.trim()}
          onClick={handleSubmit}
        >
          <MdOutlineArrowOutward size={18} />
        </button>
      </div>
    </div>
  );
};

export default PromptInputBar;

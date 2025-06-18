"use client";
import React, { JSX } from "react";
import { FiCalendar, FiTrendingUp, FiMessageCircle } from "react-icons/fi";

type SuggestionItem = {
  text: string;
  icon: JSX.Element;
};

interface SuggestionsProps {
  onSelect: (prompt: string) => void;
}

function Suggestions({ onSelect }: SuggestionsProps) {
  const suggestions: SuggestionItem[] = [
    {
      text: "Design an optimized\nwork schedule for today",
      icon: <FiCalendar size={20} />,
    },
    {
      text: "Summarize the most\nimportant global headlines",
      icon: <FiTrendingUp size={20} />,
    },
    {
      text: "Generate insights\non a complex topic",
      icon: <FiMessageCircle size={20} />,
    },
  ];

  return (
    <div className="w-full flex justify-center px-4">
      <div className="flex flex-wrap justify-center gap-4 max-w-2xl text-white">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item.text.replace(/\n/g, " "))}
            className="w-43 h-40 flex flex-col justify-between p-5 rounded-2xl bg-neutral-900 hover:bg-neutral-800/70 transition-all duration-500"
          >
            <p className="text-sm text-neutral-300 text-left whitespace-pre-line leading-snug">
              {item.text}
            </p>
            <span className="text-indigo-400">{item.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;

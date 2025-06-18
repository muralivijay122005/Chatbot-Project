// RecentChats.tsx
"use client";
import React from "react";
import { MdMoreVert } from "react-icons/md";

const histories = [
  "Tea Drops Only",
  "Midnight Rants",
  "Chaos Central",
  "Real Talk Zone",
  "Clapback Crew",
  "Inside Jokes",
  "Mood Swings",
  "The Vibe Room",
];

const RecentChats: React.FC = () => {
  return (
    <div className="flex flex-col max-h-75">
      <p className="text-sm px-3 pt-1 text-neutral-400">Recents</p>

      <ul className="text-sm mt-3 text-left overflow-y-auto scroll-hidden">
        {histories.map((history, index) => (
          <li key={index} className="mb-2">
            <div className="group/item hover:bg-neutral-800 p-2 px-3 text-neutral-200 items-center rounded-md w-full flex justify-between text-left cursor-pointer">
              <span className="overflow-hidden whitespace-nowrap group-hover/item:truncate">
                {history}
              </span>
              <div className="flex flex-row gap-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                <MdMoreVert className="text-white" size={15} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentChats;

"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import QueryBar from "@/components/PromptInputBar";
import Suggestions from "@/components/Suggestions";
import { FiUpload } from "react-icons/fi";
import { TbLayoutSidebar } from "react-icons/tb";

const Chats = dynamic(() => import("@/components/Chats"), { ssr: false });

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "___loading___" },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: data.reply,
        };
        return updated;
      });
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Error talking to AI",
        };
        return updated;
      });
    }
  };

  const isSidebarExpanded = isSidebarPinned || isSidebarHovered;

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-geist-sans)] relative select-none">
      {/* Desktop Sidebar */}
      <div
        className="hidden lg:block"
        onMouseEnter={() => !isSidebarPinned && setIsSidebarHovered(true)}
        onMouseLeave={() => !isSidebarPinned && setIsSidebarHovered(false)}
      >
        <Sidebar
          forceExpanded={isSidebarExpanded}
          pinned={isSidebarPinned}
          setSidebarHovered={setIsSidebarHovered}
          onPinChange={(pinned) => {
            setIsSidebarPinned(pinned);
            if (!pinned) setIsSidebarHovered(false);
          }}
        />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <Sidebar forceExpanded onClose={() => setIsSidebarOpen(false)} />
        </>
      )}

      {/* Mobile Open Button */}
      <button
        className="fixed top-10 left-10 z-50 p-2 rounded-md bg-neutral-800 text-white hover:bg-neutral-700 transition-colors duration-200 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <TbLayoutSidebar size={20} />
      </button>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-grow w-full transition-all duration-500 ease-in-out pt-4 pb-0 ${
          isSidebarExpanded ? "lg:pl-[220px]" : "lg:pl-[72px]"
        }`}
      >
        {/* Top Bar */}
        <div className="w-full flex justify-end items-center gap-3 mb-6 px-7 lg:mt-5 mt-5">
          <div className="relative group">
            <div className="p-2 rounded-full hover:bg-neutral-800 transition-colors duration-150">
              <FiUpload className="text-lg cursor-pointer" />
            </div>
            <span className="absolute right-0 top-full mt-2 hidden group-hover:block bg-neutral-900 text-white text-sm rounded px-3 py-1.5 whitespace-nowrap transition-opacity duration-150 opacity-0 group-hover:opacity-100 z-10">
              Share Conversation
            </span>
          </div>
          <div className="bg-neutral-300 w-8 h-8 rounded-full hover:outline-3 hover:outline-neutral-700 transition duration-150" />
        </div>

        {/* Chat Area */}
        <div
          className="w-full overflow-y-auto lg:px-4 sm:px-2 pb-18 scrollbar-visible"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <div className="max-w-2xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex justify-center pt-40">
                <Suggestions onSelect={handleSend} />
              </div>
            ) : (
              <Chats messages={messages} />
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-auto w-full flex flex-col items-center gap-2">
          <div className="fixed bottom-7 w-full z-20 px-4 pb-4">
            <QueryBar onSend={handleSend} />
            <div className="text-sm flex justify-center flex-wrap mt-3 mb-[-15px] text-neutral-400 gap-2">
              <p className="flex flex-row gap-1">
                {new Date().getFullYear()} <span>Intra</span>
              </p>
              <span>·</span>
              <p>Privacy Policy</p>
              <span>·</span>
              <p>Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

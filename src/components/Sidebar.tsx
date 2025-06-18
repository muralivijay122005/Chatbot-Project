"use client";
import React from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { MdHistory } from "react-icons/md";
import { TbLayoutSidebar } from "react-icons/tb";
import Logo from "../assets/Logo_Intra.svg";
import Logo_W_Full from "../assets/Logo_Intra_W.svg";
import RecentChats from "@/components/RecentChats";

interface SidebarProps {
  setSidebarHovered?: (hovered: boolean) => void;
  onClose?: () => void;
  forceExpanded?: boolean;
  pinned?: boolean;
  onPinChange?: (pinned: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  setSidebarHovered,
  onClose,
  forceExpanded = false,
  onPinChange,
  pinned = false,
}) => {
  const safeSetSidebarHovered = (hovered: boolean) => {
    setSidebarHovered?.(hovered);
  };

  const handlePinToggle = () => {
    onPinChange?.(!pinned);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-neutral-900 z-50 flex flex-col justify-between
        ${forceExpanded ? "w-[220px]" : "w-[72px]"}
        ${onClose ? "lg:hidden" : "lg:flex"}
        transition-[width] duration-500 ease-in-out`}
      onMouseEnter={() => safeSetSidebarHovered(true)}
      onMouseLeave={() => safeSetSidebarHovered(false)}
    >
      {onClose && (
        <button
          className="absolute top-4 right-4 p-2 rounded-md bg-neutral-800 text-white hover:bg-neutral-700 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg width="24" height="24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      {/* Top Section */}
      <div className="flex flex-col items-start px-4 pt-7 gap-6 overflow-hidden flex-grow">
        <div className="relative w-full flex items-center h-6">
          {/* Logo */}
          <div className="relative w-[140px] h-6 ms-2 flex-shrink-0">
            <Image
              src={Logo.src}
              width={500}
              height={300}
              alt="Logo collapsed"
              className={`absolute inset-0 h-6 w-auto transition-opacity duration-300 ${
                forceExpanded ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src={Logo_W_Full.src}
              alt="Logo expanded"
              width={500}
              height={300}
              className={`absolute inset-0 h-6 w-auto transition-opacity duration-300 ${
                forceExpanded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Pin Button */}
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              forceExpanded ? "opacity-100 delay-300" : "opacity-0 delay-0"
            }`}
          >
            {!onClose && (
              <button
                onClick={handlePinToggle}
                className="hidden lg:flex p-1.5 rounded-md"
                aria-pressed={pinned}
                aria-label={pinned ? "Unpin sidebar" : "Pin sidebar"}
              >
                <TbLayoutSidebar
                  size={30}
                  strokeWidth={1.7}
                  className={`p-1 rounded-md ${
                    pinned
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-2 w-full flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent hover:scrollbar-thumb-neutral-700 hover:scrollbar-track-neutral-900 transition-all duration-200">
          {/* New Chat */}
          <div className="flex items-center bg-neutral-800 rounded-md w-full py-2 px-3 cursor-pointer select-none">
            <div className="flex items-center justify-center flex-shrink-0">
              <FaRegEdit size={18} className="text-white" />
            </div>
            <span
              className={`text-sm text-neutral-200 ml-3 transition-opacity duration-300 ${
                forceExpanded ? "opacity-100 delay-200" : "opacity-0 delay-0"
              } whitespace-nowrap overflow-hidden`}
            >
              New Chat
            </span>
          </div>

          {/* Other Items */}
          <SidebarItem
            icon={<FiSearch size={18} />}
            label="Search Chats"
            show={forceExpanded}
          />

          {forceExpanded ? (
            <div className="w-full">
              <RecentChats />
            </div>
          ) : (
            <SidebarItem
              icon={<MdHistory size={20} />}
              label="History"
              show={false}
            />
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-start gap-2 px-4 pb-6 mt-auto w-full">
        <SidebarItem
          icon={<LuSettings2 size={20} />}
          label="Settings"
          show={forceExpanded}
        />
      </div>
    </aside>
  );
};

// Sidebar item with smooth fade + spacing fix
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  show: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, show }) => (
  <div className="flex items-center text-neutral-300 hover:bg-neutral-800 w-full rounded-md transition-colors duration-300 cursor-pointer py-2 px-3 select-none">
    <div className="flex items-center justify-center flex-shrink-0">{icon}</div>
    <span
      className={`text-sm ml-3 transition-opacity duration-300 ${
        show ? "opacity-100 delay-200" : "opacity-0 delay-0"
      } whitespace-nowrap overflow-hidden`}
    >
      {label}
    </span>
  </div>
);

export default Sidebar;

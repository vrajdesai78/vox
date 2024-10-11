"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
  const [position, setPosition] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [activeTab, setActiveTab] = useState<number | null>(null);
  const pathname = usePathname();

  const navItems = [
    { name: "Vox", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Buy", path: "/buy" },
    { name: "Sell", path: "/sell" },
  ];

  return (
    <nav className="bg-white p-1 shadow-md w-fit rounded-xl mx-auto font-bricolage">
      <ul
        onMouseLeave={() => {
          setPosition((prev) => ({
            ...prev,
            opacity: 0,
          }));
          setActiveTab(null);
        }}
        className="relative mx-auto flex items-center w-fit rounded-xl bg-[#F8F8F8] p-1"
      >
        {navItems.map((item, index) => (
          <Tab
            key={item.name}
            index={index}
            setPosition={setPosition}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            isActive={pathname === item.path}
            href={item.path}
          >
            <div className={`text-center ${index === 0 ? 'text-xl font-semibold' : 'text-base'} text-custom-gray text-nowrap font-inter leading-tight`}>
              {index === 0 && "🎤 "}{item.name}
            </div>
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>
    </nav>
  );
};

interface TabProps {
  index: number;
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      left: number;
      width: number;
      opacity: number;
    }>
  >;
  setActiveTab: React.Dispatch<React.SetStateAction<number | null>>;
  activeTab: number | null;
  isActive: boolean;
  href: string;
}

const Tab: React.FC<TabProps> = ({
  index,
  children,
  setPosition,
  setActiveTab,
  isActive,
  href,
}) => {
  const ref = useRef<HTMLLIElement | null>(null);

  return (
    <li
      id={`tab-${index}`}
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });

        setActiveTab(index);
      }}
      className={`relative z-10 block cursor-pointer px-4 py-1 ${
        isActive ? "text-offwhite" : "text-light-gray"
      }`}
    >
      <Link href={href}>
        {children}
      </Link>
    </li>
  );
};

interface CursorProps {
  position: {
    left: number;
    width: number;
    opacity: number;
  };
}

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-10 rounded-xl bg-white shadow-lg border border-gray-200"
    />
  );
};
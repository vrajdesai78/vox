"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import exploreData from "../../utils/explore";

type TabOption = "All Events" | "Sports" | "Theatre" | "Festivals";

const Tab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabOption>("All Events");

  const tabs: TabOption[] = ["All Events", "Sports", "Theatre", "Festivals"];

  const filteredData = selectedTab === "All Events" 
    ? exploreData 
    : exploreData.filter(event => event.category === selectedTab);

  const renderContent = () => {
    if (filteredData.length === 0) {
      return <p>No events found for {selectedTab}.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredData.map((event) => (
          <div key={event.id} className="bg-[#F6F6F6] h-48 shadow-md rounded-lg p-2 border-[1px] border-[#DADADA]">
            <Image
              src={event.bgImage}
              alt={event.title}
              width={400}
              height={200}
              className="rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4 font-bricolage">{event.title}</h3>
            {event.category && (
              <p className="text-gray-500 mt-1 border-gray-500 bg-gray-100 px-1 border-dashed flex justify-center w-32 rounded-md border-[1px]">{event.category}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="hidden sm:flex flex-row justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row space-x-0 space-y-2 sm:space-y-0 sm:space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 text-left sm:text-center ${
                selectedTab === tab
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="mt-4 sm:mt-0 flex items-center text-gray-500 gap-2 bg-[#F8F8F8] py-[6px] px-[14px] rounded-2xl shadow-md border-2 border-[#FFFFFF]">
          <Image src="/explore/filter.svg" alt="filter" width={10} height={10} />
          Filter
        </button>
      </div>

      <div className="sm:hidden relative">
        <div className="relative">
          <select
            className="w-full py-2 pl-4 pr-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-black appearance-none transition duration-150 ease-in-out"
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value as TabOption)}
          >
            {tabs.map((tab) => (
              <option key={tab} value={tab} className="text-gray-700">
                {tab}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
      </div>

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default Tab;

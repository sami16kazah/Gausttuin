"use client";
import { FC, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { Button } from "./button";

// Define the shape of an item in the items array
interface AccordionItem {
  id: number; // Ensure id is of type number
  label: string; // The label to be displayed
  content: React.ReactNode; // The content to be shown when expanded
}

// Define the props for the Accordion component
interface AccordionProps {
  items: AccordionItem[]; // The items prop is an array of AccordionItem
}

// Functional component declaration with typed props
export const Accordion: FC<AccordionProps> = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);

  const handleToggle = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;
    const icon = (
      <span className="text-2xl transition-transform duration-300">
        {isExpanded ? (
          <Button className="rounded-md bg-gradient-to-tr from-[#556D4C] via-[#AFC2A7] text-white">
            <GoChevronDown />
          </Button>
        ) : (
          <Button className="rounded-md bg-gradient-to-tr from-[#556D4C] via-[#AFC2A7] text-white">
            +
          </Button>
        )}
      </span>
    );

    return (
      <div key={item.id} className="rounded-xl shadow-lg  border border-[#556D4C] hover:border-[#AFC2A7] transition duration-300 w-2/3 justify-center m-auto my-6">
        <div
          className="flex justify-between items-center rounded-xl p-3 bg-white cursor-pointer hover:bg-gray-100"
          onClick={() => handleToggle(index)}
        >
          <span>{item.label}</span>
          {icon}
        </div>
        <div
          className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            isExpanded ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="p-5 rounded-xl bg-gray-50">{item.content}</div>
        </div>
      </div>
    );
  });

  return <div className=" rounded">{renderedItems}</div>;
};

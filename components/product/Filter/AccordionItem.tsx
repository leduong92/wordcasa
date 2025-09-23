'use client';
import { useState } from 'react';

type AccordionItemProps = {
    title: string;
    options: string[];
    field: string;
    isSelected: (field: string, value: string) => boolean;
    toggleFilter: (field: string, value: string) => void;
};

export default function AccordionItem({
    title,
    field,
    options,
    isSelected,
    toggleFilter,
}: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b">
            <button
                className="w-full flex justify-between items-center py-2 font-semibold cursor-pointer "
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span>{isOpen ? '−' : '+'}</span>
            </button>

            <div
                className={`space-y-2 pb-1 pl-2 transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}
                `}
            >
                {options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isSelected(field, opt)}
                            onChange={() => toggleFilter(field, opt)}
                            className="accent-black"
                        />
                        {opt}
                    </label>
                ))}
            </div>
        </div>
    );
}

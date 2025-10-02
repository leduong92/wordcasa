'use client';
import { CategoryDetailDto, CategoryDto, CommonPageProps } from '@/modals';
import { useState } from 'react';

interface Props extends CommonPageProps {
    title: string;
    options: CategoryDetailDto[] | undefined;
    field: string;
    isSelected: (field: string, value: string) => boolean;
    toggleFilter: (field: string, value: string) => void;
}

export default function AccordionItem({
    title,
    field,
    options,
    isSelected,
    toggleFilter,
    t,
}: Props) {
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
                {options?.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isSelected(field, opt.displayName ?? '')}
                            onChange={() => toggleFilter(field, opt.displayName ?? '')}
                            className="accent-black"
                        />
                        {opt.displayName}
                    </label>
                ))}
            </div>
        </div>
    );
}

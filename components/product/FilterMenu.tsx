'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { AccordionItem } from './AccordionItem';

export default function FilterMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex">
            {/* Nút Filter cho Mobile */}
            <button
                className="md:hidden px-4 py-2 border rounded-md mb-4"
                onClick={() => setOpen(true)}
            >
                Filters
            </button>

            {/* Sidebar Desktop */}
            <aside className="hidden md:block md:w-52 lg:w-64 sticky top-4 h-fit pr-2">
                <h3 className="font-semibold mb-2">Category</h3>

                <div className="pt-2">
                    <AccordionItem
                        title="Sofas"
                        options={[
                            'All Sofas',
                            'Sectional Sofas',
                            'Loveseats',
                            '3 Seater Sofas',
                            'Modular Sofas',
                        ]}
                    />
                    <AccordionItem
                        title="Tables"
                        options={['Dining Tables', 'Coffee Tables', 'Side Tables']}
                    />
                    <AccordionItem
                        title="Chairs"
                        options={['Armchairs', 'Dining Chairs', 'Office Chairs']}
                    />
                    <AccordionItem title="Beds" options={['King Size', 'Queen Size', 'Single']} />
                </div>

                <h3 className="font-semibold mt-6 mb-2">Featured</h3>
                <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="accent-black" /> Sale
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="accent-black" /> New Arrival
                    </label>
                </div>
            </aside>

            {/* Overlay + Sidebar Mobile */}
            <div
                className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
                    open ? 'opacity-100 visible' : 'opacity-0 invisible'
                } lg:hidden`}
                onClick={() => setOpen(false)}
            >
                {/* Sidebar panel */}
                <div
                    className={`fixed top-0 left-0 w-72 h-full bg-white p-4 shadow-lg transform transition-transform duration-300 ${
                        open ? 'translate-x-0' : '-translate-x-full'
                    }`}
                    onClick={(e) => e.stopPropagation()} // tránh click overlay đóng panel khi click trong menu
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-lg">Filters</h2>
                        <button onClick={() => setOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <h3 className="font-semibold mb-2">Category</h3>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:text-gray-600">Sofas</li>
                        <li className="cursor-pointer hover:text-gray-600">Tables</li>
                        <li className="cursor-pointer hover:text-gray-600">Chairs</li>
                        <li className="cursor-pointer hover:text-gray-600">Beds</li>
                    </ul>

                    <h3 className="font-semibold mt-6 mb-2">Featured</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="accent-black" /> Sale
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="accent-black" /> New Arrival
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

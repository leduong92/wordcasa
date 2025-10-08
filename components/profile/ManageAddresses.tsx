'use client';

import { useState } from 'react';
import { MapPin, Plus, Trash, Pencil } from 'lucide-react';

interface Address {
    id: number;
    name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
}

export default function ManageAddresses() {
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 1,
            name: 'Nguyễn Văn A',
            phone: '0987 654 321',
            address: '123 Nguyễn Trãi, Q.1',
            city: 'TP. HCM',
            country: 'Vietnam',
        },
    ]);

    const handleDelete = (id: number) =>
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));

    return (
        <div>
            <h2 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                <MapPin size={18} /> Manage Addresses
            </h2>

            <div className="space-y-4">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className="border rounded-xl p-4 flex justify-between items-start bg-gray-50"
                    >
                        <div>
                            <p className="font-medium text-neutral-800">{addr.name}</p>
                            <p className="text-sm text-neutral-500">{addr.phone}</p>
                            <p className="text-sm text-neutral-600 mt-1">
                                {addr.address}, {addr.city}, {addr.country}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                                <Pencil size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(addr.id)}
                                className="p-2 hover:bg-gray-200 text-red-500 rounded-lg cursor-pointer"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                <button className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 mt-2 cursor-pointer">
                    <Plus size={16} /> Add New Address
                </button>
            </div>
        </div>
    );
}

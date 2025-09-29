'use client';

import { clientApi } from '@/lib/clientApi';
import { useEffect, useState } from 'react';
import ShippingAddressForm from './ShippingAddressForm';
import { Plus } from 'lucide-react';

export interface ShippingAddressDto {
    id?: number;
    shippingFirstName: string;
    shippingLastName: string;
    shippingAddress1: string;
    shippingAddress2?: string;
    shippingCity: string;
    shippingProvince: string;
    shippingZipCode: string;
    shippingCountryCode: string;
    shippingPhoneNumber: string;
    shippingFloorNumber?: number;
    isRuralArea?: boolean;
    isActive?: boolean;
}

interface Props {
    onSubmit: (address: ShippingAddressDto) => void;
    onCancel: () => void;
}

export default function ShippingAddressStep({ onSubmit, onCancel }: Props) {
    const [addresses, setAddresses] = useState<ShippingAddressDto[]>([]);
    const [editing, setEditing] = useState<ShippingAddressDto | null>({
        shippingFirstName: '',
        shippingLastName: '',
        shippingAddress1: '',
        shippingAddress2: '',
        shippingCity: '',
        shippingProvince: '',
        shippingZipCode: '',
        shippingCountryCode: '',
        shippingPhoneNumber: '',
        shippingFloorNumber: 0,
        isRuralArea: false,
        isActive: false,
    });

    // load từ backend khi mở step
    useEffect(() => {
        async function loadAddresses() {
            const res = await clientApi.get<ShippingAddressDto[]>(`/api/shippingaddress`, {
                withAuth: true,
            });
            console.log(res);
            setAddresses(res.data ?? []);
        }
        loadAddresses();
    }, []);

    const handleSave = async (address: ShippingAddressDto) => {
        let saved: ShippingAddressDto;

        // if (address.id) {
        //     // update
        //     const res = await fetch(`/api/shippingaddress/${address.id}`, {
        //         method: 'PUT',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(address),
        //     });
        //     saved = await res.json();
        //     setAddresses((prev) => prev.map((a) => (a.id === saved.id ? saved : a)));
        // } else {
        //     // create
        //     const res = await fetch('/api/shippingaddress', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(address),
        //     });
        //     saved = await res.json();
        //     setAddresses((prev) => [...prev, saved]);
        // }
        setEditing(null);
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        // await fetch(`/api/shippingaddress/${id}`, { method: 'DELETE' });
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    const handleSelectDefault = async (id?: number) => {
        if (!id) return;
        // gọi backend set isDefault = true
        // await fetch(`/api/shippingaddress/${id}/set-default`, { method: 'POST' });
        // setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

                {/* Add new */}
                <button
                    onClick={() =>
                        setEditing({
                            shippingFirstName: '',
                            shippingLastName: '',
                            shippingAddress1: '',
                            shippingCity: '',
                            shippingProvince: '',
                            shippingZipCode: '',
                            shippingCountryCode: '',
                            shippingPhoneNumber: '',
                        })
                    }
                    className="px-4 py-2 bg-blue-500 text-neutral-100 hover:bg-blue-400 rounded-md cursor-pointer flex items-center gap-1"
                >
                    <Plus size={15} /> <span className="">New Address</span>
                </button>
            </div>

            {/* List addresses */}
            {addresses.map((addr) => (
                <div
                    key={addr.id}
                    className={`rounded-md ${
                        addr.isActive ? 'border-blue-600' : 'border-neutral-300'
                    }`}
                >
                    <p className="font-semibold">
                        {addr.shippingFirstName} {addr.shippingLastName}
                    </p>
                    <p>{addr.shippingAddress1}</p>
                    <p>
                        {addr.shippingCity}, {addr.shippingProvince} {addr.shippingZipCode}
                    </p>
                    <p>{addr.shippingCountryCode}</p>
                    <p>{addr.shippingPhoneNumber}</p>

                    <div className="flex gap-3 mt-2">
                        <button className="text-blue-600 text-sm" onClick={() => setEditing(addr)}>
                            Edit
                        </button>
                        <button
                            className="text-red-600 text-sm"
                            onClick={() => handleDelete(addr.id)}
                        >
                            Delete
                        </button>
                        {!addr.isActive && (
                            <button
                                className="text-green-600 text-sm"
                                onClick={() => handleSelectDefault(addr.id)}
                            >
                                Set Default
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {/* Form add/edit */}
            {editing && (
                <ShippingAddressForm
                    initialData={editing}
                    onCancel={() => setEditing(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}

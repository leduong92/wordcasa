'use client';

import { apiClient } from '@/lib/apiClient';
import { useEffect, useState } from 'react';

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
    isDefault?: boolean;
}

interface Props {
    onSubmit: (address: ShippingAddressDto) => void;
    onCancel: () => void;
}

export default function ShippingAddressStep({ onSubmit, onCancel }: Props) {
    const [addresses, setAddresses] = useState<ShippingAddressDto[]>([]);
    const [editing, setEditing] = useState<ShippingAddressDto | null>(null);

    // load từ backend khi mở step
    useEffect(() => {
        async function loadAddresses() {
            const res = await apiClient.get<ShippingAddressDto[]>(`/api/shippingaddress`, {
                credentials: 'include',
                cache: 'no-store',
                withAuth: true,
            }); // backend trả list
            console.log(res);
            // setAddresses(data);
        }
        loadAddresses();
    }, []);

    const handleSave = async (address: ShippingAddressDto) => {
        let saved: ShippingAddressDto;
        if (address.id) {
            // update
            const res = await fetch(`/api/shipping-address/${address.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(address),
            });
            saved = await res.json();
            setAddresses((prev) => prev.map((a) => (a.id === saved.id ? saved : a)));
        } else {
            // create
            const res = await fetch('/api/shipping-address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(address),
            });
            saved = await res.json();
            setAddresses((prev) => [...prev, saved]);
        }
        setEditing(null);
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        await fetch(`/api/shipping-address/${id}`, { method: 'DELETE' });
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    const handleSelectDefault = async (id?: number) => {
        if (!id) return;
        // gọi backend set isDefault = true
        await fetch(`/api/shipping-address/${id}/set-default`, { method: 'POST' });
        setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    };

    return (
        <div className="space-y-4">
            {/* List addresses */}
            {addresses.map((addr) => (
                <div
                    key={addr.id}
                    className={`p-4 border rounded-md ${
                        addr.isDefault ? 'border-blue-600' : 'border-neutral-300'
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
                        {!addr.isDefault && (
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
                + Add New Address
            </button>

            {/* Form add/edit */}
            {editing && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave(editing);
                    }}
                    className="p-4 border rounded-md space-y-3"
                >
                    <input
                        className="border p-2 w-full"
                        placeholder="First Name"
                        value={editing.shippingFirstName}
                        onChange={(e) =>
                            setEditing({ ...editing, shippingFirstName: e.target.value })
                        }
                    />
                    <input
                        className="border p-2 w-full"
                        placeholder="Last Name"
                        value={editing.shippingLastName}
                        onChange={(e) =>
                            setEditing({ ...editing, shippingLastName: e.target.value })
                        }
                    />
                    <input
                        className="border p-2 w-full"
                        placeholder="Address Line 1"
                        value={editing.shippingAddress1}
                        onChange={(e) =>
                            setEditing({ ...editing, shippingAddress1: e.target.value })
                        }
                    />
                    <input
                        className="border p-2 w-full"
                        placeholder="City"
                        value={editing.shippingCity}
                        onChange={(e) => setEditing({ ...editing, shippingCity: e.target.value })}
                    />
                    {/* ... thêm các field khác tương tự */}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditing(null)}
                            className="bg-neutral-300 px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Next button */}
            <div className="pt-4">
                <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-md"
                    onClick={() => {
                        const defaultAddr = addresses.find((a) => a.isDefault);
                        if (defaultAddr) onSubmit(defaultAddr);
                        else alert('Please select a default address!');
                    }}
                >
                    Continue to Payment
                </button>
                <button onClick={onCancel} className="ml-4 text-neutral-600 underline">
                    Back
                </button>
            </div>
        </div>
    );
}

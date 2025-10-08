'use client';

import { useState, useEffect } from 'react';
import { Pencil, Check, X, Mail, Phone, User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import ProfileSkeleton from './ProfileSkeleton';
import { Button } from '../ui/button';

export default function ProfileInfo() {
    const [user, setUser] = useState<any>(null);
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const mock = {
                name: 'Nguyễn Văn A',
                email: 'nguyenvana@example.com',
                phone: '0987 654 321',
                avatar: '/chair.jpg',
            };
            setUser(mock);
            setForm(mock);
        }, 200);
    }, []);

    const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSave = () => {
        setUser(form);
        setEditing(false);
    };

    if (!user) return <ProfileSkeleton />;

    return (
        <div>
            {/* Avatar */}
            <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden border">
                    <Image
                        src={user.avatar}
                        alt="avatar"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-neutral-800">{user.name}</h2>
                    <p className="text-sm text-neutral-500">{user.email}</p>
                </div>
            </div>

            {/* Form */}
            <div className="grid md:grid-cols-2 gap-6">
                {[
                    { label: 'Full Name', name: 'name', icon: <UserIcon size={16} /> },
                    { label: 'Email', name: 'email', icon: <Mail size={16} /> },
                    { label: 'Phone', name: 'phone', icon: <Phone size={16} /> },
                ].map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-neutral-600 mb-1">
                            {field.label}
                        </label>
                        {editing ? (
                            <input
                                name={field.name}
                                value={form[field.name as keyof typeof form]}
                                onChange={handleChange}
                                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-neutral-800 flex items-center gap-2">
                                {field.icon}
                                {user[field.name as keyof typeof user]}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="mt-8">
                {editing ? (
                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm cursor-pointer"
                        >
                            <Check size={16} /> Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm cursor-pointer"
                        >
                            <X size={16} /> Cancel
                        </button>
                    </div>
                ) : (
                    <Button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 border text-sm cursor-pointer bg-neutral-800 text-neutral-200"
                    >
                        <Pencil size={10} /> Edit
                    </Button>
                )}
            </div>
        </div>
    );
}

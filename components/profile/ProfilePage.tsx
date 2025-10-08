'use client';

import { useState } from 'react';
import { User, KeyRound, MapPin } from 'lucide-react';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ChangePassword from '@/components/profile/ChangePassword';
import ManageAddresses from '@/components/profile/ManageAddresses';
import { CommonPageProps } from '@/modals';

const ProfilePage = ({ region, t }: CommonPageProps) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'address'>('profile');

    const tabs = [
        { key: 'profile', label: 'Profile Info', icon: <User size={16} /> },
        { key: 'password', label: 'Change Password', icon: <KeyRound size={16} /> },
        { key: 'address', label: 'Manage Addresses', icon: <MapPin size={16} /> },
    ];
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-5xl mx-auto bg-white shadow-sm rounded-2xl p-6">
                <h1 className="text-xl font-semibold text-neutral-700 mb-6">My Account</h1>

                {/* Tabs */}
                <div className="flex gap-3 border-b mb-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition cursor-pointer ${
                                activeTab === tab.key
                                    ? 'border-b-2 border-blue-500 text-blue-500 bg-blue-50'
                                    : 'text-neutral-600 hover:bg-neutral-100'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                {activeTab === 'profile' && <ProfileInfo />}
                {activeTab === 'password' && <ChangePassword />}
                {activeTab === 'address' && <ManageAddresses />}
            </div>
        </div>
    );
};

export default ProfilePage;

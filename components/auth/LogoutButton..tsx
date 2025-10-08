'use client';

import { CommonPageProps } from '@/modals';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogoutButton({ region, t }: CommonPageProps) {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="py-2 flex  items-center cursor-pointer"
            aria-label="Logout"
        >
            <LogOut size={16} />
            <span className="px-5">Logout</span>
        </button>
    );
}

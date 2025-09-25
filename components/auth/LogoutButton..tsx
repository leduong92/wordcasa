'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="pt-4 flex justify-between items-center cursor-pointer"
        >
            <LogOut size={16} />
            <span className="w-2/3 px-2">Logout</span>
        </button>
    );
}

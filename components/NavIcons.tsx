'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import CartIcon from './cart/CartIcon';
import { UserRound } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useSession } from 'next-auth/react';
import LogoutButton from './auth/LogoutButton.';
import LoginButton from './auth/LoginButton';

const NavIcons = ({ lang, region }: { lang: string; region: string }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { data: session } = useSession();

    const isLoggedIn = false;

    const handleProfile = () => {
        setIsProfileOpen((prev) => !prev);
    };

    return (
        <div className="flex items-center gap-3 xl:gap-4 relative">
            <LanguageSwitcher currentLang={lang} />

            {session?.user?.email ? (
                <>
                    <button onClick={handleProfile} aria-label="Profile" className="cursor-pointer">
                        <span>{session.user?.name}</span>
                    </button>
                </>
            ) : (
                // <Link href={`/${region}/auth/login`} className="cursor-pointer">
                //     <UserRound size={18} />
                // </Link>
                <LoginButton region={region} />
            )}

            {isProfileOpen && (
                <div className="absolute bg-neutral-100 text-neutral-800 p-6 rounded-md top-8 -left-5 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 w-max">
                    <Link href="#" prefetch={true} className="flex justify-between items-center">
                        <UserRound size={16} />
                        <span className="w-2/3 px-2">Profile</span>
                    </Link>
                    <LogoutButton />
                </div>
            )}

            <CartIcon region={region} />
        </div>
    );
};

export default NavIcons;

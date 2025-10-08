'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CartIcon from './cart/CartIcon';
import { ShoppingBag, UserRound } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useSession } from 'next-auth/react';
import LogoutButton from './auth/LogoutButton.';
import LoginButton from './auth/LoginButton';
import { CommonPageProps } from '@/modals';
import { usePathname } from 'next/navigation';

const NavIcons = ({ lang, region, t }: CommonPageProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <div className="flex items-center gap-3 xl:gap-4 relative">
            <LanguageSwitcher lang={lang} />

            {session?.user?.email ? (
                <>
                    <button onClick={handleOpen} aria-label="Profile" className="cursor-pointer">
                        <span>{session.user?.name}</span>
                    </button>
                </>
            ) : (
                <LoginButton region={region} />
            )}

            {isOpen && (
                <div className="absolute bg-neutral-100 text-neutral-800 p-6 rounded-md top-8 -left-15 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 w-[200px]">
                    <Link
                        href={`/${region}/account/profile`}
                        prefetch={true}
                        className="py-2 flex items-center cursor-pointer"
                        aria-label="Profile"
                    >
                        <UserRound size={16} />
                        <span className="px-5">Profile</span>
                    </Link>
                    <Link
                        href={`/${region}/account/orders`}
                        prefetch={true}
                        className="py-2 flex items-center cursor-pointer"
                        aria-label="Order History"
                    >
                        <ShoppingBag size={16} />
                        <span className="px-5">Order History</span>
                    </Link>
                    <LogoutButton />
                </div>
            )}

            <CartIcon region={region} />
        </div>
    );
};

export default NavIcons;

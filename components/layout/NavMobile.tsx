'use client';
// import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import CartQtyLoadingSkeleton from '../cart/CartQtyLoadingSkeleton';
import { Search, ShoppingCart, TextAlignJustify, UserRound } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import SearchInput from '../SearchInput';
import { useCartStore } from '@/hook/useCartStore';

const NavMobile = (params: { color: string; region: string }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useCartStore();
    const [collectionsOpen, setCollectionsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const { color, region } = params;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted)
        return (
            <div className="flex gap-4 items-center ">
                <CartQtyLoadingSkeleton />
                <div className="">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </div>
            </div>
        );

    const toggleCollections = () => {
        setCollectionsOpen((prev) => !prev);
    };

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className={`flex md:hidden items-center justify-between w-full text-${color}`}>
            {/* Left */}
            <div className="flex items-center gap-3 w-1/3">
                {/* Menu Hambeger */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger>
                        <div className="">
                            <TextAlignJustify size={17} />
                        </div>
                    </SheetTrigger>
                    <SheetContent side={'left'}>
                        <SheetTitle></SheetTitle>
                        <div>
                            <ul className=" flex flex-col gap-4 text-lg z-10 p-5">
                                <li>
                                    <Link href="/" prefetch={true}>
                                        <span
                                            onClick={() => setIsOpen(false)}
                                            className="underline-hover"
                                        >
                                            Home
                                        </span>
                                    </Link>
                                </li>

                                <li className="relative group">
                                    <span
                                        className="underline-hover cursor-pointer "
                                        onClick={toggleCollections}
                                    >
                                        Collections
                                    </span>

                                    {collectionsOpen && (
                                        <>
                                            {/* Level 1 Dropdown */}
                                            <div className="absolute top-full left-0 bg-white shadow-lg  z-30">
                                                <ul className="min-w-[200px] py-2">
                                                    {/* Sofa Collection (Has Submenu) */}
                                                    <li className="relative group/living">
                                                        <Link
                                                            href="#"
                                                            prefetch={true}
                                                            className="block px-4 py-2"
                                                        >
                                                            <span
                                                                onClick={() => setIsOpen(false)}
                                                                className="underline-hover"
                                                            >
                                                                Living Collection
                                                            </span>
                                                        </Link>

                                                        {/* Level 2 Dropdown */}
                                                        <div className="absolute top-0 left-full bg-white shadow-lg  duration-200">
                                                            <ul className="min-w-[200px] py-2">
                                                                <li>
                                                                    <Link
                                                                        href="#/sofa"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2"
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 Sofas
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href="#living/side-table"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2"
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 Side Tables
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href="#living/console-table"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2"
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 Console Tables
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href="#living/arm-chair"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2"
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 Arm Chairs
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>

                                                    {/* Other level 1 items */}
                                                    <li className="relative group/dining">
                                                        <Link
                                                            href="#dining"
                                                            prefetch={true}
                                                            className="block px-4 py-2 cursor-pointer"
                                                        >
                                                            <span
                                                                onClick={() => setIsOpen(false)}
                                                                className="underline-hover "
                                                            >
                                                                Dining Collection
                                                            </span>
                                                        </Link>

                                                        {/* Level 2 Dropdown */}
                                                        <div className="absolute top-0 left-full bg-white shadow-lg invisible opacity-0 group-hover/dining:visible group-hover/dining:opacity-100 transition-opacity duration-200">
                                                            <ul className="min-w-[220px] py-2">
                                                                <li>
                                                                    <Link
                                                                        href="#dining/dining-chair"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2 h"
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 Dining Chairs
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href="#dining/dining-table"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2 h"
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 Dining Tables
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href="#dining/side-boards"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2 h"
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 Side Boards
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href="#living/coffee-table"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2"
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 Coffe Tables
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li className="relative group/bed">
                                                        <Link
                                                            href="#bed"
                                                            prefetch={true}
                                                            className="block px-4 py-2 cursor-pointer"
                                                        >
                                                            <span
                                                                onClick={() => setIsOpen(false)}
                                                                className="underline-hover "
                                                            >
                                                                Bed Collection
                                                            </span>
                                                        </Link>
                                                        {/* Level 2 Dropdown */}
                                                        <div className="absolute top-0 left-full bg-white shadow-lg invisible opacity-0 group-hover/bed:visible group-hover/bed:opacity-100 transition-opacity duration-200">
                                                            <ul className="min-w-[220px] py-2">
                                                                <li>
                                                                    <Link
                                                                        href="#bed/bed"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2 "
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 Beds
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href="#bed/night-stand"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2 "
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 NightStands
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href="#bed/dresser"
                                                                        prefetch={true}
                                                                        className="block px-4 py-2 "
                                                                    >
                                                                        <span
                                                                            onClick={() =>
                                                                                setIsOpen(false)
                                                                            }
                                                                            className="underline-hover"
                                                                        >
                                                                            6 Dresser
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </li>
                                <li>
                                    <Link href="/about" prefetch={true}>
                                        <span
                                            onClick={() => setIsOpen(false)}
                                            className="underline-hover"
                                        >
                                            About
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" prefetch={true}>
                                        <span
                                            onClick={() => setIsOpen(false)}
                                            className="underline-hover"
                                        >
                                            Contact
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" prefetch={true}>
                                        <span
                                            onClick={() => setIsOpen(false)}
                                            className="underline-hover"
                                        >
                                            Logout
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </SheetContent>
                </Sheet>
                {/* Search */}
                <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
                    <SheetTrigger>
                        <Search size={17} />
                    </SheetTrigger>
                    <SheetContent side={'left'}>
                        <SheetHeader>
                            <SheetTitle className="mb-6">Search products</SheetTitle>
                            <div className="w-full border-b">
                                <SearchInput isShowDialog={false} region={region} />
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <LanguageSwitcher currentLang={'en'} />
            </div>

            {/* Middle */}
            <div className="w-1/3 flex justify-center">
                <Link href="/">
                    <div className={`text-xl text-${color} tracking-widest uppercase`}>
                        WORLDCASA
                    </div>
                </Link>
            </div>

            {/* Right */}
            <div className="flex items-center justify-end gap-3 w-1/3">
                <UserRound size={17} />
                <Link href="/cart" prefetch={true} className="relative cursor-pointer">
                    <div className="cursor-pointer">
                        <ShoppingCart size={17} />
                        {cart.length > 0 && (
                            <div
                                className="absolute -top-4 -right-3 w-6 h-6 bg-neutral-900
                    rounded-full text-neutral-100  text-sm flex items-center justify-center"
                            >
                                {totalQuantity}
                            </div>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default NavMobile;

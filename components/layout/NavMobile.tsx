'use client';
// import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import CartQtyLoadingSkeleton from '../cart/CartQtyLoadingSkeleton';
import SearchBar from '../SearchBar';

const NavMobile = (params: { color: string }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const { cart } = useCartStore();
    const [collectionsOpen, setCollectionsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted)
        return (
            <div className="flex gap-4 items-center">
                {/* <MagnifyingGlassIcon className="h-5" /> */}
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

    return (
        <div className="flex gap-4 items-center text-white">
            <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
                <SheetTrigger>
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
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </SheetTrigger>
                <SheetContent side={'left'}>
                    <SheetHeader>
                        <SheetTitle>Search products</SheetTitle>
                        <SheetDescription>
                            <SearchBar onSearch={() => setSearchOpen(false)} />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <Link href="/cart" prefetch={true} className="relative cursor-pointer">
                <div className="cursor-pointer">
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
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                    </svg>
                </div>
                {/* {cart.length > 0 && (
                    <div
                        className="absolute -top-3 -right-3 w-5 h-5 bg-cartNumber 
                    rounded-full text-white text-sm flex items-center justify-center"
                    >
                        {cart.length}
                    </div>
                )} */}
            </Link>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
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
        </div>
    );
};

export default NavMobile;

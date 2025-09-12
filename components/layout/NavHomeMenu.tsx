'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavIcons from '../NavIcons';
import NavMobile from './NavMobile';
import Image from 'next/image';

const NavHomeMenu = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setVisible(false);
            } else {
                setVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`fixed top-0 w-full z-50 bg-transparent transition-all duration-300 ${
                visible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            {/* MOBILE */}
            <div className="h-[70px] px-4 flex items-center justify-between md:hidden">
                <Link href="/">
                    <div className="text-xl text-white md:text-2xl tracking-wide">WORLD CASA</div>
                </Link>
                <NavMobile color="white" />
            </div>
            {/* BIGGER Screen */}
            <nav className="hidden md:flex h-[70px] px-4 md:px-8 lg:px-32 xl:px-64 transition-colors duration-300 relative group/nav bg-transparent hover:bg-white">
                {/* Navbar container */}
                <div className="max-w-screen flex justify-between items-center h-full w-full">
                    {/* Logo */}
                    <div className="text-xl text-white group-hover/nav:text-black transition-colors duration-300 w-1/3">
                        WORLD CASA
                    </div>

                    {/* Menu Items */}
                    <ul className="flex gap-10 w-1/3 justify-center h-full">
                        {['Living', 'Dining', 'Beds', 'Collections'].map((item) => (
                            <li
                                key={item}
                                className="h-full flex group "
                                onMouseEnter={() => setOpenMenu(item)}
                                onMouseLeave={() => setOpenMenu(null)}
                            >
                                <button
                                    className="relative cursor-pointer border-b-1 border-transparent focus-visible:outline-0
                                                after:content-[''] after:absolute after:left-0 after:bottom-0
                                                after:w-0 after:h-[1px] after:bg-[#e5ae49] after:transition-all after:duration-300
                                                group-hover:after:w-full text-white group-hover/nav:text-black text-lg transition-colors duration-300"
                                    aria-label={item}
                                >
                                    {item}
                                </button>

                                {/* Mega menu */}
                                {item === 'Living' && (
                                    <div
                                        className={`
                                                absolute left-0 top-full w-full bg-white shadow-lg border-t z-50 
                                                transition-all duration-300 ease-in-out origin-top
                                                ${
                                                    openMenu === 'Living'
                                                        ? 'opacity-100 translate-y-0 visible'
                                                        : 'opacity-0 -translate-y-2 invisible'
                                                }
                                                `}
                                    >
                                        <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-32 xl:px-64">
                                            {/* Left links */}
                                            <div className="w-1/3">
                                                <Link
                                                    href="#"
                                                    className="block w-full py-3 hover:text-[#e5ae49] transition-colors duration-200"
                                                    aria-label="All Livings"
                                                >
                                                    All Livings
                                                </Link>
                                                <div className="flex gap-20 w-100">
                                                    <div className="space-y-3">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                            aria-label="Side Tables"
                                                        >
                                                            Side Tables
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                            aria-label="Cocktail Tables"
                                                        >
                                                            Cocktail Tables
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right images */}
                                            <div className="flex items-center space-x-6 w-2/3">
                                                <div className="">
                                                    <Image
                                                        src="/bed_1.jpg"
                                                        alt="New In"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">New In</p>
                                                </div>
                                                <div className="">
                                                    <Image
                                                        src="/bed_2.jpg"
                                                        alt="Sectional Sofas"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">Sectional Sofas</p>
                                                </div>
                                                <div className="">
                                                    <Image
                                                        src="/bed_3.jpg"
                                                        alt="Spill Resistant Sofas"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">
                                                        Spill Resistant Sofas
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {item === 'Dining' && (
                                    <div
                                        className={`
                                                    absolute left-0 top-full w-full bg-white shadow-lg border-t z-50 
                                                    transition-all duration-300 ease-in-out origin-top
                                                    ${
                                                        openMenu === 'Dining'
                                                            ? 'opacity-100 translate-y-0 visible'
                                                            : 'opacity-0 -translate-y-2 invisible'
                                                    }
                                                `}
                                    >
                                        <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-32 xl:px-64">
                                            {/* Left links */}
                                            <div className="w-1/3">
                                                <Link
                                                    href="#"
                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 w-100 py-3"
                                                >
                                                    All Dinings
                                                </Link>
                                                <div className="flex gap-20 w-100">
                                                    <div className="space-y-3">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Round Dining Tables
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Rectangular & Oval Dining Table
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Sideboards & Buffets
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right images */}
                                            <div className="flex items-center space-x-6 w-2/3">
                                                <div className="">
                                                    <Image
                                                        src="/bed_1.jpg"
                                                        alt="New In"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">New In</p>
                                                </div>
                                                <div className="">
                                                    <Image
                                                        src="/bed_2.jpg"
                                                        alt="Sectional Sofas"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">Sectional Sofas</p>
                                                </div>
                                                <div className="">
                                                    <Image
                                                        src="/bed_3.jpg"
                                                        alt="Spill Resistant Sofas"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">
                                                        Spill Resistant Sofas
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {item === 'Beds' && (
                                    <div
                                        className={`
                                                    absolute left-0 top-full w-full bg-white shadow-lg border-t z-50 
                                                    transition-all duration-300 ease-in-out origin-top
                                                    ${
                                                        openMenu === 'Beds'
                                                            ? 'opacity-100 translate-y-0 visible'
                                                            : 'opacity-0 -translate-y-2 invisible'
                                                    }
                                                `}
                                    >
                                        <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-32 xl:px-64">
                                            {/* Left links */}
                                            <div className="w-1/3">
                                                <Link
                                                    href="#"
                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 py-3"
                                                >
                                                    All Beds
                                                </Link>
                                                <div className="flex gap-20 w-100">
                                                    <div className="space-y-3">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Beds
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Dressers & Chests
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Nightstands
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right images */}
                                            <div className="flex items-center space-x-6 w-2/3">
                                                <div className="">
                                                    <Image
                                                        src="/bed_1.jpg"
                                                        alt="New In"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">New In</p>
                                                </div>
                                                <div className="">
                                                    <Image
                                                        src="/bed_2.jpg"
                                                        alt="Sectional Sofas"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">Sectional Sofas</p>
                                                </div>
                                                <div className="">
                                                    <Image
                                                        src="/bed_3.jpg"
                                                        alt="Spill Resistant Sofas"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">
                                                        Spill Resistant Sofas
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {item === 'Collections' && (
                                    <div
                                        className={`
                                                    absolute left-0 top-full w-full bg-white shadow-lg border-t z-50 
                                                    transition-all duration-300 ease-in-out origin-top
                                                    ${
                                                        openMenu === 'Collections'
                                                            ? 'opacity-100 translate-y-0 visible'
                                                            : 'opacity-0 -translate-y-2 invisible'
                                                    }
                                                `}
                                    >
                                        <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-32 xl:px-64">
                                            {/* Left links */}
                                            <div className="w-1/3">
                                                <Link
                                                    href="#"
                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 py-3"
                                                >
                                                    All Collections
                                                </Link>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-2">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Kyoto
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Vienna
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Seoul
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Lisbon
                                                        </Link>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Madrid
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Denver
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200"
                                                        >
                                                            Paris
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right images */}
                                            <div className="flex items-center space-x-6 w-2/3">
                                                <div className="">
                                                    <Image
                                                        src="/bed_1.jpg"
                                                        alt="New In"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">New In</p>
                                                </div>
                                                <div className="">
                                                    <Image
                                                        src="/bed_2.jpg"
                                                        alt="Sectional Sofas"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">Sectional Sofas</p>
                                                </div>
                                                <div className="">
                                                    <Image
                                                        src="/bed_3.jpg"
                                                        alt="Spill Resistant Sofas"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                    />
                                                    <p className="text-sm mt-2">
                                                        Spill Resistant Sofas
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* RIGHT */}
                    <div className="w-1/3 flex justify-end items-center text-white group-hover/nav:text-black transition-colors duration-300 gap-8">
                        {/* <SearchBar /> */}
                        <NavIcons />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavHomeMenu;

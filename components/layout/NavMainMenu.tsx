'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import NavMobile from './NavMobile';
import NavIcons from '../NavIcons';
import SearchInput from '../SearchInput';

const NavMainMenu = ({ region, lang }: { region: string; lang: string }) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
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
            className={`sticky top-0 w-full z-50  transition-all duration-300 ${
                visible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            {/* MOBILE */}
            <div className="h-[50px] px-4 flex items-center bg-white justify-between md:hidden">
                <NavMobile color="black" />
            </div>
            {/* BIGGER Screen */}
            <nav className="hidden md:flex h-full px-4 md:px-8 lg:px-24 transition-colors duration-300 shadow-sm bg-white relative group/nav py-4">
                {/* Navbar container */}
                <div className="max-w-screen flex flex-col justify-between items-center h-full w-full">
                    <div className="w-full flex ">
                        {/* Logo */}
                        <div className="w-1/2 text-2xl  group-hover/nav:text-neutral-700 tracking-wide transition-colors duration-300">
                            <Link href={'/'} className="tracking-widest uppercase">
                                Worldcasa
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="w-1/2 flex justify-end items-center text-neutral-700 tracking-wide group-hover/nav:text-neutral-700 transition-colors duration-300 gap-3">
                            {/* <SearchBar /> */}
                            <div className="w-max border-b">
                                <SearchInput />
                            </div>
                            <NavIcons lang={lang} />
                        </div>
                    </div>

                    <div className="w-full h-full pt-5">
                        {/* Menu Items */}
                        <ul className="flex gap-10 h-full">
                            {['New', 'Sofas', 'Tables', 'Chairs', 'Beds', 'Tools', 'About'].map(
                                (item) => (
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
                                                group-hover:after:w-full group-hover/nav:text-neutral-700 transition-colors duration-300 text-xl tracking-wide"
                                            aria-label={item}
                                        >
                                            {item}
                                        </button>

                                        {/* Mega menu */}
                                        {item === 'New' && (
                                            <div
                                                className={`
                                                absolute left-0 top-full w-full bg-neutral-50 shadow-lg border-t z-50 
                                                transition-all duration-300 ease-in-out origin-top
                                                ${
                                                    openMenu === 'New'
                                                        ? 'opacity-100 translate-y-0 visible'
                                                        : 'opacity-0 -translate-y-2 invisible'
                                                }
                                                `}
                                            >
                                                <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-24">
                                                    {/* Left links */}
                                                    <div className="w-1/3">
                                                        <div className="flex gap-20 w-100">
                                                            <div className="space-y-3">
                                                                <Link
                                                                    href={`/${region}/product?category=new&value=true`}
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                    aria-label="Side Tables"
                                                                >
                                                                    New Arrivals
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right images */}
                                                    <div className="flex items-center space-x-6 w-2/3">
                                                        <div className="w-[350px] aspect-[16/9]">
                                                            <Image
                                                                src="/bed_1.jpg"
                                                                alt="New In"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md object-cover transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                New In
                                                            </p>
                                                        </div>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_2.jpg"
                                                                alt="Sectional Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md object-cover transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                Sectional Sofas
                                                            </p>
                                                        </div>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_3.jpg"
                                                                alt="Spill Resistant Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md object-cover transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                Spill Resistant Sofas
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {item === 'Sofas' && (
                                            <div
                                                className={`
                                                    absolute left-0 top-full w-full bg-neutral-50 shadow-lg border-t z-50 
                                                    transition-all duration-300 ease-in-out origin-top
                                                    ${
                                                        openMenu === 'Sofas'
                                                            ? 'opacity-100 translate-y-0 visible'
                                                            : 'opacity-0 -translate-y-2 invisible'
                                                    }
                                                `}
                                            >
                                                <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-24">
                                                    {/* Left links */}
                                                    <div className="w-1/3">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide w-100 py-3"
                                                        >
                                                            All Dinings
                                                        </Link>
                                                        <div className="flex gap-20 w-100">
                                                            <div className="space-y-3">
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                >
                                                                    Round Dining Tables
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                >
                                                                    Rectangular & Oval Dining Table
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
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
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                New In
                                                            </p>
                                                        </div>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_2.jpg"
                                                                alt="Sectional Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                Sectional Sofas
                                                            </p>
                                                        </div>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_3.jpg"
                                                                alt="Spill Resistant Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                Spill Resistant Sofas
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {item === 'Tables' && (
                                            <div
                                                className={`
                                                    absolute left-0 top-full w-full bg-neutral-50 shadow-lg border-t z-50 
                                                    transition-all duration-300 ease-in-out origin-top
                                                    ${
                                                        openMenu === 'Tables'
                                                            ? 'opacity-100 translate-y-0 visible'
                                                            : 'opacity-0 -translate-y-2 invisible'
                                                    }
                                                `}
                                            >
                                                <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-24">
                                                    {/* Left links */}
                                                    <div className="w-1/3">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide py-3"
                                                        >
                                                            All Beds
                                                        </Link>
                                                        <div className="flex gap-20 w-100">
                                                            <div className="space-y-3">
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                >
                                                                    Beds
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                >
                                                                    Dressers & Chests
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
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
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                New In
                                                            </p>
                                                        </div>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_2.jpg"
                                                                alt="Sectional Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                Sectional Sofas
                                                            </p>
                                                        </div>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_3.jpg"
                                                                alt="Spill Resistant Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
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
                                                    absolute left-0 top-full w-full bg-neutral-50 shadow-lg border-t z-50 
                                                    transition-all duration-300 ease-in-out origin-top
                                                    ${
                                                        openMenu === 'Collections'
                                                            ? 'opacity-100 translate-y-0 visible'
                                                            : 'opacity-0 -translate-y-2 invisible'
                                                    }
                                                `}
                                            >
                                                <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-24">
                                                    {/* Left links */}
                                                    <div className="w-1/3">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide py-3"
                                                        >
                                                            All Collections
                                                        </Link>

                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="space-y-2">
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                >
                                                                    Kyoto
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                >
                                                                    Vienna
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                >
                                                                    Seoul
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                >
                                                                    Lisbon
                                                                </Link>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                >
                                                                    Madrid
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
                                                                >
                                                                    Denver
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 tracking-wide"
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
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                New In
                                                            </p>
                                                        </div>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_2.jpg"
                                                                alt="Sectional Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                Sectional Sofas
                                                            </p>
                                                        </div>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_3.jpg"
                                                                alt="Spill Resistant Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                Spill Resistant Sofas
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {item === 'About' && (
                                            <div
                                                className={`
                                                absolute left-0 top-full w-full bg-neutral-50 shadow-lg border-t z-50 
                                                transition-all duration-300 ease-in-out origin-top
                                                ${
                                                    openMenu === 'About'
                                                        ? 'opacity-100 translate-y-0 visible'
                                                        : 'opacity-0 -translate-y-2 invisible'
                                                }
                                                `}
                                            >
                                                <div className="max-w-screen w-full  py-6 flex px-4 md:px-8 lg:px-24">
                                                    <div className="flex items-center space-x-6 w-2/3">
                                                        <Link
                                                            href={`/${region}/about`}
                                                            className=""
                                                        >
                                                            <Image
                                                                src="/bed_1.jpg"
                                                                alt="New In"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                About Us
                                                            </p>
                                                        </Link>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_2.jpg"
                                                                alt="Sectional Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                Contact Us
                                                            </p>
                                                        </div>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_3.jpg"
                                                                alt="Spill Resistant Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                Privacy Policy
                                                            </p>
                                                        </div>
                                                        <div className="">
                                                            <Image
                                                                src="/bed_3.jpg"
                                                                alt="Spill Resistant Sofas"
                                                                width={350}
                                                                height={350}
                                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                            />
                                                            <p className="text-sm mt-2 text-neutral-700 tracking-wide">
                                                                Terms of use
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavMainMenu;

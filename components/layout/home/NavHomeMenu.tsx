'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavIcons from '../../NavIcons';
import NavMobile from '../NavMobile';
import Image from 'next/image';

const NavHomeMenu = ({ region, lang }: { region: string; lang: string }) => {
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
                    <div className="text-xl text-neutral-50 tracking-widest uppercase">
                        WORLD CASA
                    </div>
                </Link>
                <NavMobile color="white" />
            </div>
            {/* BIGGER Screen */}
            <nav className="hidden md:flex h-full px-4 md:px-8 lg:px-24 transition-colors duration-300 relative group/nav bg-transparent hover:bg-neutral-50 py-4">
                {/* Navbar container */}
                <div className="max-w-screen flex flex-col justify-between items-center h-full w-full">
                    <div className="w-full flex ">
                        {/* Logo */}
                        <div className="w-1/2 text-2xl text-neutral-50 group-hover/nav:text-neutral-700 transition-colors duration-300">
                            <Link
                                href={'/'}
                                className="focus-visible:outline-none tracking-widest uppercase"
                            >
                                WORLDCASA
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="w-1/2 flex justify-end items-center text-neutral-50 group-hover/nav:text-neutral-700 transition-colors duration-300 gap-8">
                            {/* <SearchBar /> */}

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
                                                group-hover:after:w-full text-neutral-50 group-hover/nav:text-neutral-700 transition-colors duration-300 text-xl tracking-wide"
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
                                                <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-24 ">
                                                    {/* Left links */}
                                                    <div className="w-1/3">
                                                        <span className="block w-full py-3 select-none">
                                                            New
                                                        </span>
                                                        <div className="flex gap-20 w-100">
                                                            <div className="space-y-3">
                                                                <Link
                                                                    href={`/${region}/product`}
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                    aria-label="Side Tables"
                                                                >
                                                                    New Arrivals
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                    absolute left-0 top-full w-full bg-neutral-50  shadow-lg border-t z-50 
                                                    transition-all duration-300 ease-in-out origin-top
                                                    ${
                                                        openMenu === 'Sofas'
                                                            ? 'opacity-100 translate-y-0 visible'
                                                            : 'opacity-0 -translate-y-2 invisible'
                                                    }
                                                `}
                                            >
                                                <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-24 ">
                                                    {/* Left links */}
                                                    <div className="w-1/3">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide w-100 py-3"
                                                        >
                                                            All Sofas
                                                        </Link>
                                                        <div className="flex gap-20 w-100">
                                                            <div className="space-y-3">
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Round Dining Tables
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Rectangular & Oval Dining Table
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                    absolute left-0 top-full w-full bg-neutral-50  shadow-lg border-t z-50 
                                                    transition-all duration-300 ease-in-out origin-top
                                                    ${
                                                        openMenu === 'Tables'
                                                            ? 'opacity-100 translate-y-0 visible'
                                                            : 'opacity-0 -translate-y-2 invisible'
                                                    }
                                                `}
                                            >
                                                <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-24 ">
                                                    {/* Left links */}
                                                    <div className="w-1/3">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide py-3"
                                                        >
                                                            All Tables
                                                        </Link>
                                                        <div className="flex gap-20 w-100">
                                                            <div className="space-y-3">
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Dining Tables
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Coffee Tables
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Side Tables
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
                                                                Spill Resistant Sofas
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {item === 'Chairs' && (
                                            <div
                                                className={`
                                                    absolute left-0 top-full w-full bg-neutral-50  shadow-lg border-t z-50 
                                                    transition-all duration-300 ease-in-out origin-top
                                                    ${
                                                        openMenu === 'Chairs'
                                                            ? 'opacity-100 translate-y-0 visible'
                                                            : 'opacity-0 -translate-y-2 invisible'
                                                    }
                                                `}
                                            >
                                                <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-24 ">
                                                    {/* Left links */}
                                                    <div className="w-1/3">
                                                        <Link
                                                            href="#"
                                                            className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide py-3"
                                                        >
                                                            All Chairs
                                                        </Link>

                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="space-y-2">
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Dining Chairs
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Vienna
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Seoul
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Lisbon
                                                                </Link>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Madrid
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    Denver
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                <div className="max-w-screen w-full  py-6 flex px-4 md:px-8 lg:px-24 ">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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
                                                            <p className="text-sm mt-2 text-neutral-700">
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

export default NavHomeMenu;

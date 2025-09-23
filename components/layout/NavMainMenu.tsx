'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import NavMobile from './NavMobile';
import NavIcons from '../NavIcons';
import SearchInput from '../SearchInput';
import SearchInputDesktop from '../SearchInputDesktop';
import { CategoryDto } from '@/modals';

const categories = [
    { name: 'Living rooms', slug: 'living-room', image: '/bed_1.jpg' },
    { name: 'Dining rooms', slug: 'dining-room', image: '/bed_2.jpg' },
    { name: 'Bedrooms', slug: 'bedroom', image: '/bed_3.jpg' },
];

const NavMainMenu = ({
    region,
    lang,
    categoryDtos,
}: {
    region: string;
    lang: string;
    categoryDtos: CategoryDto[] | undefined;
}) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
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
            className={`sticky top-0 w-full z-50  transition-all duration-300 

                `}
        >
            {/* MOBILE */}
            <div className="h-[50px] px-4 flex items-center  justify-between md:hidden">
                <NavMobile color="black" />
            </div>
            {/* BIGGER Screen */}
            <nav
                className={`hidden md:flex h-full px-4 md:px-8 lg:px-12  backDropFilter backGround relative group/nav py-4 ${
                    !visible ? 'boxShadown ' : ''
                }`}
            >
                {/* Navbar container */}
                <div className="max-w-screen flex flex-col justify-between items-center h-full w-full">
                    <div className="w-full flex ">
                        {/* Logo */}
                        <div className="w-1/2 text-2xl tracking-wide transition-colors duration-300">
                            <Link href={'/'} className="tracking-widest uppercase">
                                Worldcasa
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="w-1/2 flex justify-end items-center text-neutral-700 tracking-wide transition-colors duration-300 gap-3">
                            {/* <SearchBar /> */}
                            <div className="w-max border-b">
                                <SearchInputDesktop />
                            </div>
                            <NavIcons lang={lang} />
                        </div>
                    </div>

                    <div className="w-full h-full pt-5">
                        {/* Menu Items */}
                        <ul className="flex gap-10 h-full">
                            {['New'].map((item) => (
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
                                                    group-hover:after:w-full  group-hover/nav:text-neutral-700 transition-colors duration-300 text-neutral-700 tracking-wide font-helve"
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
                                            <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-12 ">
                                                {/* Left links */}
                                                <div className="w-1/3">
                                                    <div className="flex gap-20 w-100">
                                                        <div className="space-y-3">
                                                            <Link
                                                                href={{
                                                                    pathname: `/${region}/category`,
                                                                    query: {
                                                                        q: 'flag--Newcategory',
                                                                    },
                                                                }}
                                                                className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                aria-label="Side Tables"
                                                            >
                                                                New Arrivals
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right images */}
                                                <div className="flex items-center space-x-6 w-2/3">
                                                    {categories.map((cat) => (
                                                        <Link
                                                            href={`/${region}/room/${cat.slug}`}
                                                            key={cat.name}
                                                            className="cursor-pointer group"
                                                        >
                                                            <div className="">
                                                                <Image
                                                                    src={cat.image}
                                                                    alt="New In"
                                                                    width={350}
                                                                    height={350}
                                                                    className="rounded-md transform transition duration-300 ease-in-out hover:scale-105"
                                                                />
                                                                <p className="text-sm mt-2 text-neutral-700">
                                                                    {cat.name}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                            {categoryDtos?.map((item) => (
                                <li
                                    key={item.id}
                                    className="h-full flex group "
                                    onMouseEnter={() => setOpenMenu(item.displayName)}
                                    onMouseLeave={() => setOpenMenu(null)}
                                >
                                    <button
                                        className="relative cursor-pointer border-b-1 border-transparent focus-visible:outline-0
                                                after:content-[''] after:absolute after:left-0 after:bottom-0
                                                after:w-0 after:h-[1px] after:bg-[#e5ae49] after:transition-all after:duration-300
                                                group-hover:after:w-full  group-hover/nav:text-neutral-700 transition-colors duration-300 text-neutral-700 tracking-wide font-helve"
                                    >
                                        {item.displayName}
                                    </button>

                                    {/* Mega menu */}
                                    {item.displayName === 'Tables' && (
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
                                            <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-12 ">
                                                {/* Left links */}
                                                <div className="w-1/3">
                                                    <Link
                                                        href={`/${region}/discover/${item.slug}`}
                                                        className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide py-3"
                                                    >
                                                        All Tables
                                                    </Link>
                                                    <div className="flex gap-20 w-100">
                                                        <div className="space-y-3">
                                                            {item.categoryDetailDtos.map((itm) => (
                                                                <Link
                                                                    key={itm.id}
                                                                    href={`/${region}/category/${itm.slug}`}
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    {itm.displayName}
                                                                </Link>
                                                            ))}
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
                                    {item.displayName === 'Beds' && (
                                        <div
                                            className={`
                                                        absolute left-0 top-full w-full bg-neutral-50  shadow-lg border-t z-50 
                                                        transition-all duration-300 ease-in-out origin-top
                                                        ${
                                                            openMenu === 'Beds'
                                                                ? 'opacity-100 translate-y-0 visible'
                                                                : 'opacity-0 -translate-y-2 invisible'
                                                        }
                                                    `}
                                        >
                                            <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-12 ">
                                                {/* Left links */}
                                                <div className="w-1/3">
                                                    <Link
                                                        href={`/${region}/discover/${item.slug}`}
                                                        className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide py-3"
                                                    >
                                                        All Beds
                                                    </Link>

                                                    <div className="flex gap-20 w-100">
                                                        <div className="space-y-2">
                                                            {item.categoryDetailDtos.map((itm) => (
                                                                <Link
                                                                    key={itm.id}
                                                                    href={`/${region}/category/${itm.slug}`}
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    {itm.displayName}
                                                                </Link>
                                                            ))}
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
                                    {item.displayName === 'Storage' && (
                                        <div
                                            className={`
                                                        absolute left-0 top-full w-full bg-neutral-50  shadow-lg border-t z-50 
                                                        transition-all duration-300 ease-in-out origin-top
                                                        ${
                                                            openMenu === 'Storage'
                                                                ? 'opacity-100 translate-y-0 visible'
                                                                : 'opacity-0 -translate-y-2 invisible'
                                                        }
                                                    `}
                                        >
                                            <div className="max-w-screen w-full justify-center py-6 flex px-4 md:px-8 lg:px-12 ">
                                                {/* Left links */}
                                                <div className="w-1/3">
                                                    <Link
                                                        href={`/${region}/discover/${item.slug}`}
                                                        className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide py-3"
                                                    >
                                                        All Storages
                                                    </Link>

                                                    <div className="flex gap-20 w-100">
                                                        <div className="space-y-2">
                                                            {item.categoryDetailDtos.map((itm) => (
                                                                <Link
                                                                    key={itm.id}
                                                                    href={`/${region}/category/${itm.slug}`}
                                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                                >
                                                                    {itm.displayName}
                                                                </Link>
                                                            ))}
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
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavMainMenu;

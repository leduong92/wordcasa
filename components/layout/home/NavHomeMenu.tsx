'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavIcons from '../../NavIcons';
import NavMobile from '../NavMobile';
import Image from 'next/image';
import { CategoryDto } from '@/modals';
import SearchInput from '@/components/SearchInput';
import { usePathname } from 'next/navigation';

const categories = [
    { name: 'Living rooms', slug: 'living-room', image: '/bed_1.jpg' },
    { name: 'Dining rooms', slug: 'dining-room', image: '/bed_2.jpg' },
    { name: 'Bedrooms', slug: 'bedroom', image: '/bed_3.jpg' },
];

const NavHomeMenu = ({
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

    const pathname = usePathname();

    useEffect(() => {
        setOpenMenu(null);
    }, [pathname]);

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
        <div className={`fixed top-0 w-full z-50 bg-transparent transition-all duration-300`}>
            {/* MOBILE */}
            <div
                className={`h-[60px] px-4 flex items-center justify-between md:hidden
                ${
                    visible
                        ? 'translate-y-0 text-neutral-200'
                        : 'boxShadown backDropFilter backGround text-neutral-700'
                }
                `}
            >
                <NavMobile color="black" region={region} categoryDtos={categoryDtos} />
            </div>
            {/* BIGGER Screen */}
            <nav
                className={`hidden md:flex h-full px-4 md:px-8 lg:px-12 transition-colors duration-300 relative group/nav bg-transparent hover:bg-neutral-100 py-4
                ${
                    visible
                        ? 'translate-y-0 text-neutral-200'
                        : 'boxShadown backDropFilter backGround text-neutral-700'
                }
                `}
            >
                {/* Navbar container */}
                <div className="max-w-screen flex flex-col justify-between items-center h-full w-full">
                    <div className="w-full flex ">
                        <div
                            className={`w-1/3 group-hover/nav:text-neutral-700  ${
                                visible
                                    ? 'text-neutral-50 placeholder-neutral-50'
                                    : 'text-neutral-900 placeholder-neutral-900'
                            } `}
                        >
                            <div className="w-max border-b">
                                <SearchInput
                                    isShowDialog={true}
                                    region={region}
                                    isSidebar={false}
                                />
                            </div>
                        </div>
                        {/* Logo */}
                        <div className="w-1/3 text-2xl flex justify-center group-hover/nav:text-neutral-700 transition-colors duration-300">
                            <Link
                                href={'/'}
                                className="focus-visible:outline-none tracking-widest uppercase font-semibold font-basker"
                            >
                                WORLDCASA
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="w-1/3 flex justify-end items-center  group-hover/nav:text-neutral-700 transition-colors duration-300 gap-3">
                            {/* <SearchBar /> */}

                            <NavIcons lang={lang} region={region} />
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
                                                group-hover:after:w-full  group-hover/nav:text-neutral-700 transition-colors duration-300 tracking-wide font-helve"
                                        aria-label={item}
                                    >
                                        {item}
                                    </button>

                                    {/* Mega menu */}
                                    {item === 'New' && (
                                        <div
                                            className={`
                                                absolute left-0 top-full w-full bg-neutral-100 shadow-lg border-t z-50 
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
                                                group-hover:after:w-full  group-hover/nav:text-neutral-700 transition-colors duration-300tracking-wide font-helve"
                                    >
                                        {item.displayName}
                                    </button>

                                    {/* Mega menu */}
                                    {item.displayName === 'Tables' && (
                                        <div
                                            className={`
                                                    absolute left-0 top-full w-full bg-neutral-100  shadow-lg border-t z-50 
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
                                                    absolute left-0 top-full w-full bg-neutral-100  shadow-lg border-t z-50 
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
                                                    absolute left-0 top-full w-full bg-neutral-100  shadow-lg border-t z-50 
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

export default NavHomeMenu;

'use client';
import { CategoryDto, CommonPageProps } from '@/modals';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const categories = [
    { name: 'Living rooms', slug: 'living-room', image: '/denver_cocktail_table.jpg' },
    { name: 'Dining rooms', slug: 'dining-room', image: '/bed_2.jpg' },
    { name: 'Bedrooms', slug: 'bedroom', image: '/bed_3.jpg' },
];

interface Props extends CommonPageProps {
    categoryDtos: CategoryDto[] | undefined;
}

const MegaMenu = ({ region, t, lang, categoryDtos }: Props) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        setOpenMenu(null);
    }, [pathname]);
    return (
        <>
            <ul className="flex gap-10 h-full ">
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
                                                group-hover:after:w-full  group-hover/nav:text-neutral-700 transition-colors duration-300 tracking-wide font-helve "
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
                                                        pathname: `/${region}/shop/new-arrivals`,
                                                    }}
                                                    className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                    aria-label="Side Tables"
                                                >
                                                    {t?.newArrivals}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right images */}
                                    <div className="flex items-center space-x-6 w-2/3">
                                        {categories.map((cat) => (
                                            <Link
                                                href={`/${region}/discover/rooms/${cat.slug}`}
                                                key={cat.name}
                                                className="cursor-pointer group"
                                                aria-label={cat.name}
                                            >
                                                <div className="">
                                                    <Image
                                                        src={cat.image}
                                                        alt="New In"
                                                        width={350}
                                                        height={350}
                                                        className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
                                                    />
                                                    <p className="text-sm mt-2 text-neutral-700">
                                                        {cat.name} designs
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
                            aria-label={item.displayName ?? ''}
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
                                            href={`/${region}/discover/categories/${item.slug}`}
                                            className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide py-3"
                                            aria-label="Table collections"
                                        >
                                            Table collections
                                        </Link>
                                        <div className="flex gap-20 w-100">
                                            <div className="space-y-3">
                                                {item.categoryDetailDtos.map((itm) => (
                                                    <Link
                                                        key={itm.id}
                                                        href={`/${region}/shop/category/${itm.slug}`}
                                                        className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                        aria-label={itm.displayName ?? ''}
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
                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
                                            />
                                            <p className="text-sm mt-2 text-neutral-700">New In</p>
                                        </div>
                                        <div className="">
                                            <Image
                                                src="/bed_2.jpg"
                                                alt="Sectional Sofas"
                                                width={350}
                                                height={350}
                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
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
                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
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
                                            href={`/${region}/discover/categories/${item.slug}`}
                                            className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide py-3"
                                            aria-label="Beds collections"
                                        >
                                            Beds collections
                                        </Link>

                                        <div className="flex gap-20 w-100">
                                            <div className="space-y-2">
                                                {item.categoryDetailDtos.map((itm) => (
                                                    <Link
                                                        key={itm.id}
                                                        href={`/${region}/shop/category/${itm.slug}`}
                                                        className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                        aria-label={itm.displayName ?? ''}
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
                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
                                            />
                                            <p className="text-sm mt-2 text-neutral-700">New In</p>
                                        </div>
                                        <div className="">
                                            <Image
                                                src="/bed_2.jpg"
                                                alt="Sectional Sofas"
                                                width={350}
                                                height={350}
                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
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
                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
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
                                            href={`/${region}/discover/categories/${item.slug}`}
                                            className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide py-3"
                                            aria-label="Storage collections"
                                        ></Link>

                                        <div className="flex gap-20 w-100">
                                            <div className="space-y-2">
                                                {item.categoryDetailDtos.map((itm) => (
                                                    <Link
                                                        key={itm.id}
                                                        href={`/${region}/shop/category/${itm.slug}`}
                                                        className="block hover:text-[#e5ae49] transition-colors duration-200 text-neutral-700 tracking-wide"
                                                        aria-label={itm.displayName ?? ''}
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
                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
                                            />
                                            <p className="text-sm mt-2 text-neutral-700">New In</p>
                                        </div>
                                        <div className="">
                                            <Image
                                                src="/bed_2.jpg"
                                                alt="Sectional Sofas"
                                                width={350}
                                                height={350}
                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
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
                                                className="rounded-md transform transition duration-300 ease-in-out hover:scale-105 w-full h-auto"
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
                {['Ideas & Inspiration'].map((item) => (
                    <li
                        key={item}
                        className="h-full flex group "
                        onMouseEnter={() => setOpenMenu(item)}
                        onMouseLeave={() => setOpenMenu(null)}
                    >
                        <Link
                            href={{
                                pathname: `/${region}/ideas-and-inspiration`,
                            }}
                            className="relative cursor-pointer border-b-1 border-transparent focus-visible:outline-0
                                                after:content-[''] after:absolute after:left-0 after:bottom-0
                                                after:w-0 after:h-[1px] after:bg-[#e5ae49] after:transition-all after:duration-300
                                                group-hover:after:w-full  group-hover/nav:text-neutral-700 transition-colors duration-300 tracking-wide font-helve "
                            aria-label={item}
                        >
                            {item}
                        </Link>

                        {/* Mega menu */}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MegaMenu;

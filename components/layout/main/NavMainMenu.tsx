'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import NavMobile from '../NavMobile';
import NavIcons from '../../NavIcons';
import SearchInput from '../../SearchInput';
import { CategoryDto } from '@/modals';
import MegaMenu from '../MegaMenu';

const NavMainMenu = ({
    region,
    lang,
    categoryDtos,
}: {
    region: string;
    lang: string;
    categoryDtos: CategoryDto[] | undefined;
}) => {
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
        <div className={`sticky top-0 w-full z-50  transition-all duration-300 `}>
            {/* MOBILE */}
            <div
                className={`h-[60px] px-4 flex items-center backDropFilter backGround justify-between md:hidden ${
                    visible ? '' : 'boxShadown'
                }`}
            >
                <NavMobile color="black" region={region} categoryDtos={categoryDtos} />
            </div>
            {/* BIGGER Screen */}
            <nav
                className={`hidden md:flex h-full px-4 md:px-8 lg:px-12  backDropFilter backGround relative group/nav py-4 ${
                    visible ? ' ' : 'boxShadown'
                }`}
            >
                {/* Navbar container */}
                <div className="max-w-screen flex flex-col justify-between items-center h-full w-full">
                    <div className="w-full flex ">
                        <div className={`w-1/3 text-neutral-700`}>
                            <div className="w-max border-b">
                                <SearchInput
                                    isShowDialog={true}
                                    region={region}
                                    isSidebar={false}
                                />
                            </div>
                        </div>
                        {/* Logo */}
                        <div className="w-1/3 text-2xl flex justify-center transition-colors duration-300">
                            <Link
                                href={'/'}
                                className="tracking-widest uppercase font-semibold font-basker text-neutral-700"
                            >
                                Worldcasa
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="w-1/3 flex justify-end items-center text-neutral-700 tracking-wide transition-colors duration-300 gap-3">
                            <NavIcons lang={lang} region={region} />
                        </div>
                    </div>

                    <div className="w-full h-full pt-5 text-neutral-700">
                        {/* Menu Items */}
                        <MegaMenu lang={lang} region={region} categoryDtos={categoryDtos} />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavMainMenu;

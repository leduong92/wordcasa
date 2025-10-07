'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavIcons from '../../NavIcons';
import NavMobile from '../NavMobile';
import { CategoryDto, CommonPageProps } from '@/modals';
import SearchInput from '@/components/SearchInput';
import MegaMenu from '../MegaMenu';

interface Props extends CommonPageProps {
    categoryDtos: CategoryDto[] | undefined;
}

const NavHomeMenu = ({ region, lang, t, categoryDtos }: Props) => {
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
                <NavMobile color="neutral" region={region} categoryDtos={categoryDtos} t={t} />
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
                <div className="max-w-screen flex flex-col justify-between items-center h-full w-full ">
                    <div className="w-full flex ">
                        <div
                            className={`w-1/3 group-hover/nav:text-neutral-700  ${
                                visible
                                    ? 'text-neutral-100 placeholder-neutral-100'
                                    : 'text-neutral-900 placeholder-neutral-900'
                            } `}
                        >
                            <div className="w-max border-b">
                                <SearchInput
                                    isShowDialog={true}
                                    region={region}
                                    isSidebar={false}
                                    t={t}
                                />
                            </div>
                        </div>
                        {/* Logo */}
                        <div className="w-1/3 text-2xl flex justify-center group-hover/nav:text-neutral-700 transition-colors duration-300">
                            <Link
                                href={'/'}
                                className="focus-visible:outline-none tracking-widest uppercase font-semibold font-basker"
                                aria-label="WorldCasa"
                            >
                                WORLDCASA
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="w-1/3 flex justify-end items-center  group-hover/nav:text-neutral-700 transition-colors duration-300 gap-3">
                            {/* <SearchBar /> */}

                            <NavIcons lang={lang} region={region} t={t} />
                        </div>
                    </div>

                    <div
                        className={`w-full h-full pt-5 text-neutral-200 ${
                            visible
                                ? 'text-neutral-200 placeholder-neutral-20'
                                : 'text-neutral-800 placeholder-neutral-800'
                        } `}
                    >
                        {/* Menu Items */}
                        <MegaMenu lang={lang} region={region} categoryDtos={categoryDtos} t={t} />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavHomeMenu;

'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { TextAlignJustify } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import SearchInput from '../SearchInput';
import CartIcon from '../cart/CartIcon';
import { CategoryDto, CommonPageProps } from '@/modals';
import LoginButton from '../auth/LoginButton';

interface Props extends CommonPageProps {
    color: string;
    categoryDtos: CategoryDto[] | undefined;
}

const NavMobile = (params: Props) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { color, region, lang, t, categoryDtos } = params;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div></div>;

    return (
        <div className={`flex md:hidden items-center justify-between w-full `}>
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
                        <SheetTitle className="py-4 w-full text-center boxShadown">
                            <Link
                                href={'/'}
                                className="tracking-widest uppercase font-semibold font-basker text-neutral-700"
                                aria-label="Worldcasa"
                            >
                                Worldcasa
                            </Link>
                        </SheetTitle>
                        <div>
                            <div className="border-b pt-2">
                                <SearchInput
                                    isShowDialog={false}
                                    region={region}
                                    isSidebar={true}
                                />
                            </div>
                            <ul className="flex flex-col gap-4 text-lg z-10 p-5">
                                <li>
                                    <Link
                                        href={{
                                            pathname: `/${region}/shop/new-arrivals`,
                                        }}
                                        prefetch={true}
                                        aria-label={`/${region}/shop/new-arrivals`}
                                    >
                                        <span
                                            onClick={() => setIsOpen(false)}
                                            className="text-neutral-700 tracking-wide"
                                        >
                                            New Arrivals
                                        </span>
                                    </Link>
                                </li>

                                {categoryDtos?.map((item, idx) => (
                                    <li key={item.id || idx}>
                                        <div>
                                            <div className="">
                                                <div onClick={() => setIsOpen(false)}>
                                                    <Link
                                                        href={`/${region}/discover/categories/${item.slug}`}
                                                        aria-label={item.displayName ?? ''}
                                                    >
                                                        {item.displayName}
                                                    </Link>
                                                </div>
                                                {item.categoryDetailDtos.map((itm, idx) => (
                                                    <div key={itm.id || idx} className="px-5">
                                                        <Link
                                                            href={`/${region}/shop/category/${itm.slug}`}
                                                            className="text-neutral-700 text-sm tracking-wide"
                                                            aria-label={item.displayName ?? ''}
                                                        >
                                                            {itm.displayName}
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                ))}

                                <li className="border-t pt-5 text-sm">
                                    <Link
                                        href={`/${region}/about`}
                                        prefetch={true}
                                        aria-label="About"
                                    >
                                        <span onClick={() => setIsOpen(false)} className="">
                                            About
                                        </span>
                                    </Link>
                                </li>
                                <li className="text-sm">
                                    <Link
                                        href={`/${region}/contact`}
                                        prefetch={true}
                                        aria-label="contact"
                                    >
                                        <span onClick={() => setIsOpen(false)} className="">
                                            Contact
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </SheetContent>
                </Sheet>
                <LanguageSwitcher lang={lang} />
            </div>

            {/* Middle */}
            <div className="w-1/3 text-xl flex justify-center transition-colors duration-300">
                <Link href="/" title="WorldCasa" aria-label="WorldCasa">
                    <div
                        className={`text-${color} tracking-widest uppercase font-semibold font-basker`}
                    >
                        WORLDCASA
                    </div>
                </Link>
            </div>

            {/* Right */}
            <div className="flex items-center justify-end gap-3 w-1/3">
                <LoginButton region={region} />
                <CartIcon region={region} />
            </div>
        </div>
    );
};

export default NavMobile;

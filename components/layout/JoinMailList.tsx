'use client';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CommonPageProps } from '@/modals';
import Link from 'next/link';

const JoinMailList = ({ region, t }: CommonPageProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('joinMailList');
        if (consent !== 'true') {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 300); // 30s delay

            return () => clearTimeout(timer);
        }
    }, []);

    const handleSend = () => {
        localStorage.setItem('joinMailList', 'true');
        setIsOpen(false);
    };
    if (!isOpen) return null;
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <div className="relative max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
                        {/* Left Image */}
                        <div className="md:w-1/2">
                            <img
                                src="/bed_1.jpg"
                                alt="Popup Image"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="md:w-1/2 p-6 flex flex-col relative">
                            {/* Title */}
                            {/* <h2 className="text-2xl font-semibold mb-2">Join Our Mailing List</h2> */}

                            {/* Description */}
                            {/* <p className="text-sm text-neutral-600 mb-4">
                                Be the first to be notified of our exclusive deals, new arrivals,
                                styling tips and more.
                            </p> */}
                            <div className="text-center py-2">
                                <h1 className="w-full text-center py-1 text-neutral-600 text-sm">
                                    ENTER FOR YOUR CHANCE TO WIN A
                                </h1>
                                <span className="text-xl font-bold tracking-wide text-neutral-800">
                                    $50 <span>WORLDCASA</span> GIFT CARD
                                </span>
                                <p className="text-sm text-neutral-600 mb-4 py-2">
                                    Be the first to be notified of our exclusive deals, new
                                    arrivals, styling tips and more.
                                </p>
                            </div>

                            {/* Email Input */}
                            <input
                                type="email"
                                placeholder="Email"
                                className="border border-neutral-300 rounded-md p-3 mb-4"
                            />

                            {/* Subscribe Button */}
                            <button
                                className="bg-brown-600 text-neutral-100 py-3 rounded-md font-semibold hover:bg-brown-700 transition cursor-pointer"
                                onClick={handleSend}
                                aria-label="Subscribe mail"
                            >
                                Subscribe
                            </button>

                            {/* Disclaimer */}
                            <p className="text-xs text-neutral-600 mt-4 italic">
                                By signing up, you agree to be included in our newsletter for future
                                events & promotions.
                            </p>
                            <Link
                                href={`/${region}/web/terms-of-use`}
                                aria-label="Terms of use"
                                className="text-[10px] underline underline-offset-4 text-muted-foreground py-2"
                            >
                                Terms and Conditions
                            </Link>
                        </div>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="default"
                        onClick={handleSend}
                        aria-label="Subscribe"
                        className="cursor-pointer"
                    >
                        Subscribe
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default JoinMailList;

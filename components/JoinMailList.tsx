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

const JoinMailList = ({ region, t }: CommonPageProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('joinMailList');
        if (consent !== 'true') {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 30000); // 30s delay

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
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <div className="relative max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
                        {/* Left Image */}
                        <div className="md:w-1/2">
                            <img
                                src="/bed_1.jpg" // đổi đường dẫn ảnh
                                alt="Popup Image"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="md:w-1/2 p-6 flex flex-col relative">
                            {/* Title */}
                            <h2 className="text-2xl font-semibold mb-2">Join Our Mailing List</h2>

                            {/* Description */}
                            <p className="text-sm text-neutral-600 mb-4">
                                Be the first to be notified of our exclusive deals, new arrivals,
                                styling tips and more.
                            </p>

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
                        </div>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="default" onClick={handleSend} aria-label="Subscribe">
                        Subscribe
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default JoinMailList;

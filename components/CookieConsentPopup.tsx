'use client';
import { useEffect, useState } from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

export default function CookieConsentPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent !== 'true') {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000); // 3s delay

            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsOpen(false);
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent className="bg-white rounded-t-xl shadow-lg p-6 max-w-lg mx-auto">
                <DrawerHeader>
                    <DrawerTitle className="text-neutral-700">Cookie Consent</DrawerTitle>
                </DrawerHeader>
                <div className="text-neutral-600">
                    This website stores cookies on your computer. These cookies are used to collect
                    information about how you interact with our website and allow us to remember
                    you. We use this information in order to improve and customize your browsing
                    experience and for analytics and metrics about our visitors both on this website
                    and other media. To find out more about the cookies we use, see our Privacy
                    Policy.
                </div>
                <DrawerFooter>
                    <Button variant="default" onClick={handleAccept} className="cursor-pointer">
                        Accept
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline" className="cursor-pointer">
                            Reject
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

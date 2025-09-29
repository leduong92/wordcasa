'use client';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function CookieConsentPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent !== 'true') {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000); // 30s delay

            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Cookie Consent</DialogTitle>
                    <DialogDescription>
                        We use cookies to improve your experience. By continuing, you accept our use
                        of cookies.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="default" onClick={handleAccept}>
                        Accept
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

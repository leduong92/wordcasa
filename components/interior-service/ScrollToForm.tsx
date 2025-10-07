'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CommonPageProps } from '@/modals';
import { MoveRight } from 'lucide-react';

export default function ScrollToForm({ region }: CommonPageProps) {
    useEffect(() => {
        // Nếu navigate tới có hash => tự scroll
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash === '#form-section') {
                const target = document.getElementById('form-section');
                if (target) {
                    setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
                }
            }
        }
    }, []);

    const handleScroll = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = document.getElementById('form-section');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            history.replaceState(null, '', '#form-section');
        }
    };

    return (
        <Button
            variant={'outline'}
            onClick={handleScroll}
            className="px-8 py-5 cursor-pointer text-neutral-600"
        >
            Book now
            <MoveRight />
        </Button>
    );
}

'use client';
import { ArrowUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const GoToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            className={`fixed bottom-6 right-6 z-50 p-3  rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-50 shadow-lg transition-opacity duration-500 cursor-pointer
            ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} `}
            aria-label="Scroll to top"
            onClick={handleScrollTop}
        >
            <ArrowUp size={20} className="text-neutral-300" />
        </button>
    );
};

export default GoToTopButton;

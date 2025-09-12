'use client';
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
            className={`fixed bottom-6 right-6 z-50 p-2 rounded-full bg-gray-800 hover:bg-black text-white shadow-lg transition-opacity duration-500 cursor-pointer
            ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} `}
            aria-label="Scroll to top"
            onClick={handleScrollTop}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-icon lucide-arrow-up"
            >
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
            </svg>
        </button>
    );
};

export default GoToTopButton;

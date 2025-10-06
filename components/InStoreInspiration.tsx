'use client';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CommonPageProps } from '@/modals';

export default function InStoreInspiration({ region }: CommonPageProps) {
    const text = 'Get inspired in store'.split('');

    const [key, setKey] = useState(0);

    useEffect(() => {
        const totalDuration = text.length * 50 + 2000; // 50ms mỗi ký tự + 2s nghỉ
        const interval = setInterval(() => {
            setKey((prev) => prev + 1); // reset animation bằng cách đổi key
        }, totalDuration);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <section className="relative w-full h-[450px] md:h-[500px] overflow-hidden">
            {/* Background Image */}
            <Image
                src="/bed_2.jpg"
                alt="Get inspired in store"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content Centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-neutral-100 px-4">
                <h1 key={key} className="text-5xl font-semibold mb-4 flex tracking-wide py-5">
                    {text.map((char, i) => (
                        <span
                            key={i}
                            className="opacity-0 animate-fadeInChar"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
                <p className="max-w-3xl mb-5 text-xs text-neutral-200">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nulla, aliquid
                    animi veniam et dolor eligendi temporibus quidem corrupti accusamus cum repellat
                    aut autem deserunt molestiae quisquam fuga? Perferendis, velit.
                </p>
                <Link
                    href={`/${region}/store`}
                    className="flex items-center gap-2 bg-neutral-200 text-gray-800 rounded-md px-6 py-3 hover:bg-gray-100 transition cursor-pointer"
                >
                    Find my local store
                    <ArrowRight size={18} />
                </Link>
            </div>
        </section>
    );
}

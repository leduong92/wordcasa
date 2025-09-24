'use client';
import { Pause, Play } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface VidepPlayerProps {
    src: string;
    videoClass: string;
}

const VideoPlayer = ({ src, videoClass }: VidepPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                setIsPlaying(false);
            });
        }
    }, []);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="">
            <video ref={videoRef} src={src} className={videoClass} muted loop playsInline />

            <button
                onClick={togglePlay}
                className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/50 rounded-full p-2 shadow-lg transition z-10 cursor-pointer"
            >
                {isPlaying ? (
                    <Pause className="w-5 h-5 text-neutral-200" />
                ) : (
                    <Play className="w-5 h-5 text-neutral-200" />
                )}
            </button>

            <div className="absolute inset-0 bg-neutral-900/30 flex items-center justify-center px-4 text-center">
                {/* <div>
                    <h1 className="text-white bg-transparent font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug">
                        Welcome to Worldcasa
                    </h1>
                    <p className="mt-4 text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                        Luxury furniture & timeless designs for your living space.
                    </p>
                    <div className="mt-6  gap-4">
                        <button className="px-6 py-3 bg-neutral-100 text-neutral-800 font-medium rounded-md hover:bg-[#d19a3f] transition cursor-pointer">
                            Shop Now
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default VideoPlayer;

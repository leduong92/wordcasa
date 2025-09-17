import Image from 'next/image';
import React from 'react';

const Footer = ({ lang }: { lang: string }) => {
    return (
        <footer className="mt-24 px-4 md:px-8 lg:px-24">
            {/* Top section */}
            <div className="flex">
                <div className="hidden md:block w-1/3 border-b h-32"></div>
                <div className="md:col-span-2 flex gap-6 p-4 md:p-12 bg-neutral-200 rounded-xl w-full md:w-2/3">
                    <div className="flex-1 rounded-md overflow-hidden">
                        <Image
                            src="/bed_3.jpg"
                            alt="Get free fabric samples"
                            width={300}
                            height={150}
                            className="w-full h-36 md:h-52 object-cover"
                        />
                        <p className="p-2 font-medium text-base">Get free fabric samples</p>
                    </div>
                    <div className="flex-1 rounded-md overflow-hidden">
                        <Image
                            src="/bed_4.jpg"
                            alt="Need help? Let's talk"
                            width={300}
                            height={150}
                            className="w-full h-36 md:h-52 object-cover"
                        />
                        <p className="p-2 font-medium text-base">Need help? Let&apos;s talk</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-20 py-10">
                {/* Left links */}
                <div className="space-y-2 text-base text-gray-700">
                    <p>Customer Service</p>
                    <p>Find store</p>
                    <p>About Worldcasa</p>
                    <p>Delivery Policy</p>
                    <p>Sale & Return Policy</p>
                </div>
                <div></div>
                {/* Social icons */}
                <div className="flex items-center justify-center gap-6 py-6">
                    <a href="#" className="p-2 border rounded-full hover:bg-gray-200">
                        <Image src="/facebook.png" alt="" width={25} height={25} />
                    </a>
                    <a href="#" className="p-2 border rounded-full hover:bg-gray-200">
                        <Image src="/instagram.png" alt="" width={25} height={25} />
                    </a>
                    <a href="#" className="p-2 border rounded-full hover:bg-gray-200">
                        <Image src="/pinterest.png" alt="" width={25} height={25} />
                    </a>
                    <a href="#" className="p-2 border rounded-full hover:bg-gray-200">
                        <Image src="/youtube.png" alt="" width={25} height={25} />
                    </a>
                    <a href="#" className="p-2 border rounded-full hover:bg-gray-200">
                        <Image src="/x.png" alt="" width={25} height={25} />
                    </a>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t px-6 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                {/* Left text */}
                <p className="text-center md:text-left">
                    {/* All prices are recommended retail prices in Vietnamese DONG (₫) and include VAT. */}
                    © 2025 World Casa
                </p>

                {/* Middle links */}
                <div className="flex gap-6">
                    <a href="#">Cookie information</a>
                    <a href="#">Terms &amp; conditions</a>
                    <a href="#">Privacy policy</a>
                </div>

                {/* Right side: payment + language */}
                <div className="flex items-center gap-6">
                    {/* Payment icons */}
                    <div className="flex items-center gap-2">
                        <img src="/paypal.png" alt="Apple Pay" className="h-6" />
                        <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                        <img src="/visa.png" alt="Visa" className="h-6" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

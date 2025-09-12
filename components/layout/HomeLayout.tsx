import Link from 'next/link';
import NavHomeMenu from './NavHomeMenu';

export default function HomeLayout({
    children,
    region,
}: {
    children: React.ReactNode;
    region: string;
}) {
    return (
        <div className="bg-gray-50 ">
            <NavHomeMenu />

            <main className="flex-1">{children}</main>

            {/* <footer className="p-4 bg-blue-600 text-white text-center">Home Footer</footer> */}
        </div>
    );
}

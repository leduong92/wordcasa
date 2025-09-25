'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserRound } from 'lucide-react';
import { useAuthModal } from '@/hook/useAuthModal';

const LoginButton = ({ region }: { region: string }) => {
    const pathname = usePathname();
    const callbackUrl = encodeURIComponent(pathname);

    const { setView } = useAuthModal();

    return (
        // <Link href={`/${region}/login?callbackUrl=${callbackUrl}`} className="p-2">
        //     <UserRound size={18} />
        // </Link>
        <button onClick={() => setView('login')} className="cursor-pointer">
            <UserRound size={18} />
        </button>
    );
};

export default LoginButton;

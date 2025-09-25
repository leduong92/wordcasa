'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserRound } from 'lucide-react';
import { useUserModal } from '@/hook/useUserModal';

const LoginButton = ({ region }: { region: string }) => {
    const pathname = usePathname();
    const callbackUrl = encodeURIComponent(pathname);

    const { setOpen } = useUserModal();

    return (
        // <Link href={`/${region}/login?callbackUrl=${callbackUrl}`} className="p-2">
        //     <UserRound size={18} />
        // </Link>
        <button onClick={() => setOpen('login')} className="cursor-pointer">
            <UserRound size={18} />
        </button>
    );
};

export default LoginButton;

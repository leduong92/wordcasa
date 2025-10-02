import { useAuthModal } from '@/hook/useAuthModal';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Mail, MoveRight } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import { CommonPageProps } from '@/modals';

const RegisterForm = ({ region, t }: CommonPageProps) => {
    const { open, setView, setOpen } = useAuthModal();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [subscribe, setSubscribe] = useState(true);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        setOpen(false);
    };
    return (
        <>
            <div>
                <h3 className="text-lg font-semibold mb-4">Sign up with Email</h3>
                <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                    <Input placeholder="Email" type="email" required />
                    <Input placeholder="Password" type="password" required />
                    <Input placeholder="Confirm Password" type="password" required />

                    <Button
                        className="bg-[#8B572A] hover:bg-[#734522] text-white flex items-center justify-center gap-2"
                        aria-label="Sign up"
                    >
                        Sign up <MoveRight size={16} />
                    </Button>
                </form>

                <p className="text-sm text-center text-muted-foreground pt-2">
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={() => setView('login')}
                        className="underline font-medium cursor-pointer"
                        aria-label="Login"
                    >
                        Log in
                    </button>
                </p>
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                        checked={acceptTerms}
                        onCheckedChange={(val) => setAcceptTerms(!!val)}
                    />
                    I agree
                    <Link href={`/${region}/web/terms-of-use`} aria-label="terms-of-use">
                        <span className="text-[#8B572A] underline cursor-pointer">
                            Terms of Use
                        </span>
                    </Link>
                </label>

                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox checked={subscribe} onCheckedChange={(val) => setSubscribe(!!val)} />
                    Yes, I would like to receive marketing emails and special offers from Worldcasa.
                </label>
            </div>
        </>
    );
};

export default RegisterForm;

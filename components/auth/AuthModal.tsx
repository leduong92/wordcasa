'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/hook/useAuthModal';
import { Apple, Facebook, Mail } from 'lucide-react';
import Image from 'next/image';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotForm from './ForgotForm';

export default function UserModal() {
    const { open, view, setOpen } = useAuthModal();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[90vh] p-4 md:p-10">
                <DialogHeader className="hidden">
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-4 border-b md:border-b-0 md:border-r flex flex-col justify-center gap-4">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-serif text-center mb-4">
                                Welcome
                            </DialogTitle>
                            <p className="text-center text-sm text-muted-foreground mb-6">
                                Log in or sign up for an account. Furniture shopping is about to get
                                exciting, and we wouldn’t want you to miss out on anything.
                            </p>
                        </DialogHeader>

                        <div className="flex flex-col gap-3">
                            <Button
                                variant="outline"
                                className="flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#166FE0]"
                            >
                                <Facebook size={18} /> {`Continue with Facebook`}
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900"
                            >
                                <Apple size={18} /> {`Continue with Apple`}
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center justify-center gap-2"
                            >
                                <Image src="/google-icon.svg" alt="Google" width={18} height={18} />
                                {`Continue with Google`}
                            </Button>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col justify-center gap-4">
                        {view === 'login' && <LoginForm />}
                        {view === 'signup' && <RegisterForm />}
                        {view === 'forgot' && <ForgotForm />}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

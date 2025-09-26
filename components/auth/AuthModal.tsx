'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/hook/useAuthModal';
import { Apple, Facebook, Mail } from 'lucide-react';
import Image from 'next/image';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotForm from './ForgotForm';

export default function UserModal({ region }: { region: string }) {
    const { open, view, setOpen } = useAuthModal();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-4xl md:top-[40%] p-6 md:p-8 md:h-[500px]">
                <DialogHeader className="hidden">
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 border-b md:border-b-0 md:border-r flex flex-col justify-center gap-4">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-serif text-center mb-4">
                                Welcome
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground mb-6 text-justify">
                                Log in or sign up for an account. Furniture shopping is about to get
                                exciting, and we wouldn’t want you to miss out on anything.
                            </p>
                        </DialogHeader>

                        <div className="flex flex-col gap-3">
                            <Button
                                variant="outline"
                                className="flex items-center justify-center gap-2 bg-[#1877F2] text-neutral-100 hover:bg-[#166FE0]/80 hover:text-neutral-100 cursor-pointer"
                            >
                                <Facebook size={18} />
                                <span>{`Continue with Facebook`}</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center justify-center gap-2 bg-neutral-800 text-neutral-100  hover:bg-neutral-700 hover:text-neutral-100 cursor-pointer"
                            >
                                <Apple size={18} />
                                <span>{`Continue with Apple`}</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center justify-center gap-2 cursor-pointer hover:bg-neutral-200 hover:text-neutral-800"
                            >
                                <div className="">
                                    <Image
                                        src="/google-icon.svg"
                                        alt="Google"
                                        width={18}
                                        height={18}
                                    />
                                </div>
                                <span>{`Continue with Google`}</span>
                            </Button>
                        </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center gap-4">
                        {view === 'login' && <LoginForm />}
                        {view === 'signup' && <RegisterForm region={region} />}
                        {view === 'forgot' && <ForgotForm />}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

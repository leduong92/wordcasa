'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserModal } from '@/hook/useUserModal';

export default function UserModal() {
    const { open, setOpen } = useUserModal();

    const isLogin = open === 'login';
    const isRegister = open === 'register';

    return (
        <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
            <DialogContent className="sm:max-w-2xl p-8 md:p-16">
                <DialogHeader>
                    <DialogTitle>{isLogin ? 'Login' : 'Register'}</DialogTitle>
                </DialogHeader>

                {isLogin && (
                    <form className="flex flex-col gap-4 mt-4 space-y-2">
                        <Input placeholder="Email" />
                        <Input type="password" placeholder="Password" />
                        <Button type="submit">Login</Button>

                        <p className="text-sm text-center text-muted-foreground">
                            Chưa có tài khoản?{' '}
                            <button
                                type="button"
                                onClick={() => setOpen('register')}
                                className="underline font-medium"
                            >
                                Đăng ký ngay
                            </button>
                        </p>
                    </form>
                )}

                {isRegister && (
                    <form className="flex flex-col gap-4 mt-4">
                        <Input placeholder="Tên đầy đủ" />
                        <Input placeholder="Email" />
                        <Input type="password" placeholder="Mật khẩu" />
                        <Button type="submit">Đăng ký</Button>

                        <p className="text-sm text-center text-muted-foreground">
                            Đã có tài khoản?{' '}
                            <button
                                type="button"
                                onClick={() => setOpen('login')}
                                className="underline font-medium"
                            >
                                Đăng nhập
                            </button>
                        </p>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

'use client';

import { create } from 'zustand';

type AuthModalView = 'login' | 'signup' | 'forgot' | null;

interface AuthModalState {
    view: AuthModalView;
    open: boolean;
    setView: (view: AuthModalView) => void;
    setOpen: (open: boolean) => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
    view: null,
    open: false,
    setView: (view) => set({ view, open: !!view }),
    setOpen: (open) => set({ open, view: open ? 'login' : null }),
}));

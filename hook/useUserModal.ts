'use client';

import { create } from 'zustand';

type ModalType = 'login' | 'register' | null;

interface UserModalState {
    open: ModalType;
    setOpen: (value: ModalType) => void;
}

export const useUserModal = create<UserModalState>((set) => ({
    open: null,
    setOpen: (value) => set({ open: value }),
}));

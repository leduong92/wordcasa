'use client';
import { Button } from '@/components/ui/button';
import { CommonPageProps } from '@/modals';
import { ArrowLeft, MoveLeft } from 'lucide-react';

export function BackButton({ t }: CommonPageProps) {
    return (
        <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 cursor-pointer"
            aria-label="Back button"
        >
            <MoveLeft className="w-4 h-4" />
            {t?.back}
        </Button>
    );
}

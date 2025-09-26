'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MoveLeft } from 'lucide-react';

export function BackButton() {
    return (
        <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 cursor-pointer"
        >
            <MoveLeft className="w-4 h-4" />
            Back
        </Button>
    );
}

'use client';

import { CommonPageProps } from '@/modals';
import { CheckCircle2 } from 'lucide-react';

const steps = [
    { id: 1, name: 'Cart' },
    { id: 2, name: 'Address' },
    { id: 3, name: 'Payment' },
    { id: 4, name: 'Review' },
];

interface CheckoutStepProps extends CommonPageProps {
    currentStep: number;
}

export default function CheckoutSteps({ currentStep, t }: CheckoutStepProps) {
    return (
        <div className="relative mb-6">
            {/* Line nền xám */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300" />

            {/* Các step */}
            <div className="flex justify-between relative">
                {steps.map((step) => {
                    const isCompleted = step.id < currentStep;
                    const isActive = step.id === currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center w-full">
                            {/* Icon */}
                            <div
                                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                  ${
                      isCompleted
                          ? 'bg-green-100 border-green-200 text-neutral-500'
                          : isActive
                          ? 'border-blue-400 text-blue-400 bg-white'
                          : 'border-gray-300 bg-white text-gray-400'
                  }
                `}
                            >
                                {isCompleted ? (
                                    <CheckCircle2 className="w-6 h-6" />
                                ) : (
                                    <span className="font-semibold">{step.id}</span>
                                )}
                            </div>

                            {/* Label */}
                            <span
                                className={`mt-2 text-sm font-medium text-center
                  ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-600' : 'text-gray-500'}
                `}
                            >
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Line xanh hiển thị tiến trình */}
            <div
                className="absolute top-5 left-0 h-0.5 bg-green-300 transition-all duration-500"
                style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
            />
        </div>
    );
}

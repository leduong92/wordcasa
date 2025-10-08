'use client';

import { CheckCircle2, Truck, Package } from 'lucide-react';

interface Props {
    status: 'Processing' | 'Shipped' | 'Delivered';
}

export default function OrderProgress({ status }: Props) {
    const steps = [
        { name: 'Processing', icon: Package },
        { name: 'Shipped', icon: Truck },
        { name: 'Delivered', icon: CheckCircle2 },
    ];

    const currentStep = steps.findIndex((s) => s.name === status);

    return (
        <div className="relative flex items-center justify-between w-full mt-4">
            {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= currentStep;

                return (
                    <div key={step.name} className="flex flex-col items-center w-full relative">
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                                ${
                                    isActive
                                        ? 'border-blue-500 bg-blue-100 text-blue-600'
                                        : 'border-gray-200 text-gray-400'
                                }
                            `}
                        >
                            <Icon size={20} className="z-10" />
                        </div>
                        <p
                            className={`text-xs mt-2 ${
                                isActive ? 'text-blue-600 font-medium' : 'text-gray-400'
                            }`}
                        >
                            {step.name}
                        </p>

                        {/* line connector */}
                        {index < steps.length - 1 && (
                            <div
                                className={`absolute top-5 left-[100%] h-[2px] w-full -translate-x-1/2 z-0
                  ${index < currentStep ? 'bg-blue-500' : 'bg-gray-200'}
                `}
                            ></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

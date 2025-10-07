'use client';

import React, { useState } from 'react';
import CartItems from '@/components/cart/CartItems';
import CartSummary from '@/components/cart/CartSummary';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { MoveLeft, MoveRight } from 'lucide-react';
import { Button } from '../ui/button';
import ShippingAddressStep from './ShippingAddressStep';
import { CommonPageProps } from '@/modals';
import PaymentForm from './PaymentForm';

export default function CheckoutPage({ region, t }: CommonPageProps) {
    const [currentStep, setCurrentStep] = useState(1);

    const [shippingAddress, setShippingAddress] = useState<any>(null);
    const [cartItems, setCartItems] = useState<any[]>([]);

    const nextStep = () => {
        setCurrentStep((s) => Math.min(s + 1, 3));
    };
    const prevStep = () => {
        setCurrentStep((s) => Math.max(s - 1, 1));
    };

    return (
        <div className="py-5">
            <h1 className="text-3Xxl md:text-4xl font-bold mb-10">Checkout</h1>
            {/* Progress bar */}
            <CheckoutSteps currentStep={currentStep} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    {currentStep === 1 && <CartItems region={region} isCheckout={true} />}
                    {currentStep === 2 && (
                        <div className="bg-neutral-200/10 rounded-lg">
                            <ShippingAddressStep
                                onSubmit={(addr) => {
                                    nextStep(); // Payment step
                                }}
                                onCancel={prevStep}
                            />
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="bg-neutral-200/10 rounded-lg">
                            <PaymentForm items={cartItems} shippingAddress={shippingAddress} />
                        </div>
                    )}
                    {/* {currentStep === 4 && (
                        <div className="bg-neutral-200/10 rounded-md">
                            <h2 className="text-xl font-semibold mb-4">Review Order</h2>
                            <p>Comming soon...</p>
                        </div>
                    )} */}

                    {/* Navigation buttons */}
                    <div className="flex justify-between pt-6">
                        {currentStep > 1 ? (
                            <Button
                                onClick={prevStep}
                                className="px-6 py-2 border bg-neutral-100 text-neutral-600 hover:bg-neutral-200 cursor-pointer flex items-center gap-2"
                                aria-label="Back"
                            >
                                <MoveLeft /> Back
                            </Button>
                        ) : (
                            <div />
                        )}

                        {currentStep < 3 ? (
                            <Button
                                onClick={() => {
                                    nextStep();
                                }}
                                className="px-6  text-neutral-300 hover:bg-neutral-600 flex items-center gap-2 cursor-pointer"
                                aria-label="Next"
                            >
                                <span>Next</span> <MoveRight size={12} />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => alert('Order placed!')}
                                className="px-6 py-2 bg-green-600 text-neutral-100 hover:bg-green-700 cursor-pointer"
                                aria-label="Place Order"
                            >
                                Place Order
                            </Button>
                        )}
                    </div>
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-24">
                        <CartSummary region={region} isCheckout={true} t={t} />
                    </div>
                </div>
            </div>
        </div>
    );
}

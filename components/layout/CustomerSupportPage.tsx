'use client';

import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { CommonPageProps } from '@/modals';

export default function CustomerSupportPage({ region }: CommonPageProps) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
            {/* Left Section */}
            <div>
                <h1 className="text-4xl font-semibold leading-tight mb-4">
                    Design Furniture and Interior Design
                </h1>
                <p className="text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti repellendus
                    vel, itaque harum nemo doloremque iure debitis omnis beatae dolor quod ipsum
                    totam veniam, culpa laboriosam ea rerum. Id, quia.
                </p>
            </div>

            {/* Right Section */}
            <div>
                <Accordion type="single" collapsible className="w-full space-y-6">
                    {/* 1. Chat with designers */}
                    <AccordionItem value="designers" className="border-t border-gray-200 pt-4">
                        <AccordionTrigger className="text-lg font-medium">
                            Chat with our Interior Designers
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            <p className="mb-4">
                                Speak directly with one of our Interior Designers to bring your
                                vision to life. Our experts are ready to offer personalized advice,
                                creative solutions, and guidance tailored to your unique style and
                                space.
                            </p>
                            <Button
                                variant="default"
                                className="bg-black text-white hover:bg-gray-800"
                            >
                                Learn more about our Interior Design Service →
                            </Button>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 2. Find a store */}
                    <AccordionItem value="store" className="border-t border-gray-200 pt-4">
                        <AccordionTrigger className="text-lg font-medium">
                            Find a store near you
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            <p className="mb-4">
                                Discover BoConcept stores closest to you and come and get a feel for
                                our products, chat about your living space, and how to achieve your
                                desired look and functionality.
                            </p>
                            <Button
                                variant="default"
                                className="bg-black text-white hover:bg-gray-800"
                            >
                                Go to store locator →
                            </Button>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 3. Customer services */}
                    <AccordionItem value="customer" className="border-t border-gray-200 pt-4">
                        <AccordionTrigger className="text-lg font-medium">
                            Customer services
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            <p className="mb-4">
                                Explore our customer services page for detailed information about
                                assembly, delivery, sampling, warranties, and a variety of other
                                helpful services.
                            </p>
                            <Button
                                variant="default"
                                className="bg-black text-white hover:bg-gray-800"
                            >
                                Go to customer services →
                            </Button>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 4. Careers */}
                    <AccordionItem
                        value="career"
                        className="border-t border-b border-gray-200 pt-4"
                    >
                        <AccordionTrigger className="text-lg font-medium">
                            Looking for a career with us?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            <p>
                                We’re always looking for talented individuals who share our passion
                                for design, innovation, and customer experience.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

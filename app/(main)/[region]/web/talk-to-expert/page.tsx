import ProjectForm from '@/components/ProjectForm';
import Image from 'next/image';
import React from 'react';

const TalkToExpert = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <section className="px-6 md:px-16 lg:px-24 py-12 text-gray-800">
                    {/* Header Section */}
                    <div className="max-w-4xl">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                            Article’s Interior Design Services
                        </h2>
                        <p className="text-gray-600 mb-6">
                            We offer complete design plans. Tell us about your home, your needs, and
                            your vision. Our team of experts will create a custom layout including
                            furniture recommendations and color coordination, just for you.
                        </p>

                        <p className="font-medium mb-4">It’s perfect for:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div>
                                <Image
                                    src="/1.svg"
                                    alt="Custom Designs"
                                    width={40}
                                    height={40}
                                    className="mb-2"
                                />
                                <p className="">Creating custom designs</p>
                                <p className="text-sm text-gray-600">for new spaces.</p>
                            </div>

                            <div>
                                <Image
                                    src="/1.svg"
                                    alt="Room Redesigns"
                                    width={40}
                                    height={40}
                                    className="mb-2"
                                />
                                <p className="">Complete room redesigns</p>
                                <p className="text-sm text-gray-600">for existing spaces.</p>
                            </div>

                            <div>
                                <Image
                                    src="/1.svg"
                                    alt="Layout Options"
                                    width={40}
                                    height={40}
                                    className="mb-2"
                                />
                                <p className="">Exploring layout options</p>
                                <p className="text-sm text-gray-600">to find the right fit.</p>
                            </div>
                        </div>
                    </div>

                    {/* Process Section */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-semibold mb-6">Our Design Process</h3>

                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Step 1 */}
                            <div>
                                <Image
                                    src="/bed_1.jpg"
                                    alt="Step 1"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mb-3"
                                />
                                <p className="text-sm">
                                    <strong>Step 1:</strong> Vivian used our self-serve online form
                                    to share the details of her project.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div>
                                <Image
                                    src="/bed_2.jpg"
                                    alt="Step 2"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mb-3"
                                />
                                <p className="text-sm">
                                    <strong>Step 2:</strong> We built a design plan with detailed
                                    options for each room in her project.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div>
                                <Image
                                    src="/bed_3.jpg"
                                    alt="Step 3"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mb-3"
                                />
                                <p className="text-sm">
                                    <strong>Step 3:</strong> Vivian ordered the items they wanted
                                    from the plan and enjoyed stress-free delivery.
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div>
                                <Image
                                    src="/bed_4.jpg"
                                    alt="Step 4"
                                    width={600}
                                    height={400}
                                    className="rounded-lg mb-3"
                                />
                                <p className="text-sm">
                                    <strong>Step 4:</strong> Everything fits and looks great. They
                                    got back to rest and relaxation.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div>
                    <ProjectForm />
                </div>
            </div>
        </div>
    );
};

export default TalkToExpert;

'use client';

import { useState } from 'react';

export default function ProjectForm() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        zip: '',
        typeOfRoom: '',
        projectTimeline: '',
        projectStatus: '',
        lifestyle: '',
        message: '',
        agree: false,
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        alert('Form submitted successfully!');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 py-2 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-5 border border-gray-100"
            >
                <h2 className="text-center text-xl font-semibold mb-6">
                    Tell Us About Your Project
                </h2>

                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    />
                </div>

                {/* Zip */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Shipping Postal Code / Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        placeholder="Start typing..."
                        required
                        className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    />
                </div>

                {/* Type of Rooms */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Type of Rooms <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="typeOfRoom"
                        value={form.typeOfRoom}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option>Living Room</option>
                        <option>Bedroom</option>
                        <option>Dining Room</option>
                        <option>Office</option>
                    </select>
                </div>

                {/* Project Timeline */}
                <div>
                    <label className="block text-sm font-medium mb-1">Project Timeline</label>
                    <select
                        name="projectTimeline"
                        value={form.projectTimeline}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option>Less than 1 month</option>
                        <option>1–3 months</option>
                        <option>3–6 months</option>
                        <option>6+ months</option>
                    </select>
                </div>

                {/* Project Status */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Project Status <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="projectStatus"
                        value={form.projectStatus}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option>Planning</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>

                {/* Lifestyle */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Lifestyle Considerations
                    </label>
                    <input
                        type="text"
                        name="lifestyle"
                        value={form.lifestyle}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Anything else we should know?
                    </label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Don't worry; lots more room in the style survey that we'll email you when this form is submitted!"
                        className="w-full border rounded-md px-3 py-2 h-24 resize-none focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    />
                </div>

                {/* Checkbox */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="agree"
                        checked={form.agree}
                        onChange={handleChange}
                        required
                        className="w-4 h-4 accent-orange-500"
                    />
                    <label className="text-sm">
                        I understand Article will email me (*Required)
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition"
                >
                    SUBMIT
                </button>

                <p className="text-center text-gray-400 text-xs pt-2">Powered by Freshsales</p>
            </form>
        </div>
    );
}

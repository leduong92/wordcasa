'use client';

import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { Button } from '../ui/button';

export default function ChangePassword() {
    const [form, setForm] = useState({ current: '', new: '', confirm: '' });
    const [success, setSuccess] = useState(false);

    const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (form.new === form.confirm) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                <KeyRound size={18} /> Change Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
                {['current', 'new', 'confirm'].map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-neutral-600 mb-1 capitalize">
                            {field === 'confirm' ? 'Confirm Password' : field + ' Password'}
                        </label>
                        <input
                            type="password"
                            name={field}
                            value={form[field as keyof typeof form]}
                            onChange={handleChange}
                            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}

                <Button
                    type="submit"
                    className="px-4 py-2rounded-lg text-sm cursor-pointer bg-neutral-800 text-neutral-200"
                    aria-label="Save Change Password"
                >
                    Update Password
                </Button>

                {success && (
                    <p className="text-green-600 text-sm mt-3">✅ Password updated successfully!</p>
                )}
            </form>
        </div>
    );
}

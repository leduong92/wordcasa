import AuthModal from '@/components/auth/AuthModal';

export default function RegisterPage() {
    return (
        <AuthModal title="Register">
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Name" className="border p-2 rounded" />
                <input type="email" placeholder="Email" className="border p-2 rounded" />
                <input type="password" placeholder="Password" className="border p-2 rounded" />
                <button type="submit" className="bg-black text-white py-2 rounded">
                    Register
                </button>
            </form>
        </AuthModal>
    );
}

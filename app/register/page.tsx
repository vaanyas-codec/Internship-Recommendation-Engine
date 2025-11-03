'use client';

import Link from 'next/link';

export default function RegisterPage() {
    return (
        <section className="max-w-md mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Create an Account</h1>
            <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full border rounded-md px-4 py-2" />
                <input type="email" placeholder="Email" className="w-full border rounded-md px-4 py-2" />
                <input type="password" placeholder="Password" className="w-full border rounded-md px-4 py-2" />
                <button type="submit" className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Register
                </button>
            </form>
            <p className="text-center mt-4 text-sm text-slate-600">
                Already have an account? <Link href="/login" className="text-blue-600">Login</Link>
            </p>
        </section>
    );
}

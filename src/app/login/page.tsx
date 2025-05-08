'use client';

import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from "next/image";

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push('/');
        }
    }, [session, router]);

    if (session) {
        return null;
    }

    return (
        <div className="w-full h-full flex flex-row items-center justify-center">
            <button
                className="flex flex-row hover:cursor-pointer border rounded-full p-4"
                onClick={() => signIn("google")}
            >
                <Image src="/images/sso/google_logo.png" alt="Google logo" width={24} height={24} className="w-8 h-8 mr-2" />
                <span className="text-2xl font-bold">Se connecter avec Google</span>
            </button>
        </div>
    );
}
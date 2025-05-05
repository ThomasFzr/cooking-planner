'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export const Page = () => {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="w-full h-[100%] flex flex-row items-center justify-center">

                <button className="flex flex-row hover:cursor-pointer border rounded-full p-4" onClick={() => signIn("google")}>
                    <img src="/images/sso/google_logo.png" alt="Google logo" className="w-8 h-8 mr-2" />
                    <span className="text-2xl font-bold">Sign in with Google</span>
                    </button>
            </div>
        )

    }

    const router = useRouter();
    router.push('/');
    return null;
}
export default Page;
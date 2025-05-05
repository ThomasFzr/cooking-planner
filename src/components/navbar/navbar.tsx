'use client';
import { useSession } from "next-auth/react";

import Link from 'next/link';

export const Navbar = () => {
    const { data: session } = useSession();

    return (
        <div className="w-full flex flex-row justify-between items-center p-4 text-3xl pb-16 font-bold">
            <Link href="/">Home</Link>
            <Link href="/recipes">Explorer des recettes</Link>
            {session ? (
                <>
                    <Link href="/planner">Mes recettes</Link>
                    {/* <Link href="/my-cart">Mon panier</Link> */}
                    <Link href="/profile">
                        <img src='/images/profile.png' alt="profile" className="w-10 h-10" />
                    </Link>
                </>
            ) : (
                <Link href="/login">Se connecter</Link>
            )}

        </div>
    );
};
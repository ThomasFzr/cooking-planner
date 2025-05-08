'use client';
import { useSession } from "next-auth/react";
import Image from "next/image";

import Link from 'next/link';

export const Navbar = () => {
    const { data: session } = useSession();

    return (
        <div className="w-full flex flex-row justify-between items-center p-4 text-3xl pb-16 font-bold">
            <Link href="/">
                <Image src="/images/cooking_planner_logo2.png" alt="logo" width={25} height={25} />
            </Link>
            <Link href="/recipes">Explorer des recettes</Link>
            {session ? (
                <>
                    <Link href="/planner">Mes recettes</Link>
                    {/* <Link href="/my-cart">Mon panier</Link> */}
                    <Link href="/profile">
                        <Image src='/images/profile.png' alt="profile" width={10} height={10} />
                    </Link>
                </>
            ) : (
                <Link href="/login">Se connecter</Link>
            )}

        </div>
    );
};
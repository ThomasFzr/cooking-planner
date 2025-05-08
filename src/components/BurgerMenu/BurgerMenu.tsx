'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function BurgerMenu() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            {/* Burger Icon for Mobile */}
            <div className="lg:hidden flex items-center" onClick={toggleMenu}>
                <div className="w-6 h-1 bg-black mb-2"></div>
                <div className="w-6 h-1 bg-black mb-2"></div>
                <div className="w-6 h-1 bg-black"></div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 right-0 bg-white shadow-lg p-4 space-y-4 w-full">
                    <Link href="/recipes" onClick={toggleMenu}>Explorer des recettes</Link>
                    {session ? (
                        <>
                            <Link href="/planner" onClick={toggleMenu}>Mes recettes</Link>
                            {/* <Link href="/my-cart" onClick={toggleMenu}>Mon panier</Link> */}
                            <Link href="/profile" onClick={toggleMenu}>
                                <Image src='/images/profile.png' alt="profile" width={50} height={50} />
                            </Link>
                        </>
                    ) : (
                        <Link href="/login" onClick={toggleMenu}>Se connecter</Link>
                    )}
                </div>
            )}
        </div>
    );
};
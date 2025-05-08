'use client';

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {

    const { data: session } = useSession();

    console.log(session);

    return (
        <div className="w-full flex flex-col justify-center items-center p-4 text-3xl pb-16 font-bold">


            <div className="flex flex-col justify-center items-center p-4 text-2xl">
                {session ? (
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl pb-8">Mon profil</h1>
                        <Image src={session.user?.image ?? ''} alt="profile image" width={60} height={60} className="w-20 h-20 rounded-full" />
                        <p>Email: {session.user?.email}</p>
                        <p>Nom: {session.user?.name}</p>
                        <button onClick={() => signOut()} className="bg-[#5e0787] text-white px-4 py-2 rounded mt-4 flex flex-row items-center hover:cursor-pointer">
                            <Image src='/images/logout.png' alt="logout" width={20} height={20} className="w-5 h-5 mr-2" />
                            Se déconnecter
                        </button>
                    </div>
                ) : (
                    <p>Veuillez vous connecter pour voir vos informations</p>
                )}
            </div>
        </div>
    );
}
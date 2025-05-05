'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import DragAndDrop from '@/components/DragAndDrop/DragAndDrop';

export const Page = () => {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("google")}>Sign in with Google</button>;
  }

    return (
      <div className="w-full flex flex-row items-center justify-center">
        <h1>Welcome {session.user?.name}</h1>
        <button onClick={() => signOut()}>Sign out</button>
        <DragAndDrop />
      </div>
    );
  }
  export default Page;
'use client';
import { signOut, useSession } from "next-auth/react";

import DragAndDrop from '@/components/DragAndDrop/DragAndDrop';

export const Page = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {session ? (
        <button onClick={() => signOut()}>Se déco</button>
      ) : (<span>YES</span>)}
      <DragAndDrop />
    </div>
  );
}
export default Page;
'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        {session ? (
          <>
            <li><Link href="/profile">Profile</Link></li>
            <li><button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
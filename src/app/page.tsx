 "use client";
import { useUserContext } from "@/context/UserContext";
import { Pencil } from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const {  status } = useSession();
  const { user } = useUserContext();


  const router=useRouter();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg text-center relative">
        {user?.image && (
          <Image
            src={user.image}
            width={500}
            height={500}
            alt="User Image"
            className="mx-auto mb-4 h-24 w-24 rounded-full border-4 border-blue-100 object-cover"
          />
        )}
        <Pencil onClick={()=>router.push("/edit")} className="absolute top-3 right-5 cursor-pointer"/>
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          {user?.name}
        </h1>
        <p className="mb-6 text-gray-600">{user?.email}</p>
        <button
          onClick={() => signOut()}
          className="w-full rounded-md bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/register", data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="p-4 rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={data.name}
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-800 text-white"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={data.email}
              required
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-800 text-white"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-800 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-md bg-blue-500 hover:bg-blue-700 font-bold"
          >
            Register
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400">OR</span>
          <div className="grow border-t border-gray-600"></div>
        </div>
        <button
          onClick={async () => {
            await signIn("google",{
             callbackUrl:"/"
            });

          }}
          type="button"
          className="w-full p-2 rounded-md bg-white text-black font-bold flex items-center justify-center"
        >
          <svg
            className="w-6 h-6 mr-2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Google</title>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Sign up with Google
        </button>
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

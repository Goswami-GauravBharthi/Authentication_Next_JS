"use client";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";

import Image from "next/image";
import React, { useEffect, useState } from "react";

function EditPage() {

  const data = useUserContext();
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name as string);
    }
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (file) {
        formData.append("image", file);
      }

      // Replace with your actual API endpoint
      const res = await axios.post("/api/edit", formData);
      data?.setUser(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800">
        <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">
          Edit Profile
        </h1>

        {/* Image Upload Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-800 group-hover:border-white transition-colors duration-300">
              <Image
                src={
                  image ||
                  data?.user?.image ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
                width={500}
                height={500}
                alt="profile image"
                className="w-full h-full object-cover bg-zinc-800"
              />
            </div>
            <label
              htmlFor="image-upload"
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <p className="mt-3 text-zinc-500 text-sm">
            Click to upload new image
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-400 mb-2"
            >
              Display Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600"
              placeholder="Enter your name"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3.5 rounded-lg hover:bg-zinc-200 transition-colors transform active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPage;

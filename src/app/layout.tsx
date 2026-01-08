import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/ClientProvider";
import UserContext from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication",
  description:
    "A simple authentication app built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <UserContext>{children}</UserContext>
        </ClientProvider>
      </body>
    </html>
  );
}

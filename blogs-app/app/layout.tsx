import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs App",
  description: "A simple blogs app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-50 font-sans dark:bg-black margin: 2xl">
      <body>
        <nav>
          <Link href="/">home</Link>
          {" | "}
          <Link href="/blogs">blogs</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}

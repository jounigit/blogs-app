import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs App",
  description: "A simple blogs app built with Next.js",
};

<meta
  name="format-detection"
  content="telephone=no, date=no, email=no, address=no"
/>

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-50 font-sans dark:bg-black margin: 2xl">
      <body>
        <nav className="m-4">
          <Link href="/" className="font-bold text-fg-brand hover:underline">home</Link>
          {" | "}
          <Link href="/blogs" className="font-bold text-fg-brand hover:underline">blogs</Link>
          {" | "}
          <Link href="/blogs/new" className="font-bold text-fg-brand hover:underline">create new blog</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}

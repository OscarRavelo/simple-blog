import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Oscar Ravelo Blog",
  description: "A personal blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await prisma.posts.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}
      >
        <div className="flex flex-col h-screen">
          <header className="bg-blue-500 text-white py-4 px-6 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold ">My Blog</h1>
              </Link>
              <nav>
                <Link href="/" className="text-lg font-medium hover:underline">
                  Home
                </Link>
              </nav>
            </div>
          </header>

          <div className="flex flex-1 max-w-6xl ">
            <aside className="w-64 bg-gray-100  flex-shrink-0 p-4 border-r border-gray-200 sticky top-0 h-screen">
              <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
              <ul>
                {posts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/post/${post.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

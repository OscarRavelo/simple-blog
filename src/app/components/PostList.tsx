"use client";
import { useRouter } from "next/navigation";

export default function PostList({ posts }: { posts: [] }) {
  const router = useRouter();
  console.log(posts);
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:cursor-pointer hover:border-blue-500 "
            onClick={() => router.push(`/post/${post.id}`)}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 ">
              {post.title}
            </h2>
            <p className="text-gray-700 mb-4">{post.content}</p>

            <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded">
              {post.Category?.name || "Uncategorized"} •{" "}
              {new Date(post.createdAt).toLocaleDateString("es-Es")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

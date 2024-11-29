import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await prisma.posts.findMany({
    include: {
      Category: true,
    },
  });

  return (
    <div>
      <h1 className="">Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="text-black mt-9">
          <h2 className="font-bold ">{post.title}</h2>
          <p>{post.content}</p>

          <span className="border border-gray-300">
            {post.Category?.name || "Uncategorized"} •{" "}
            {new Date(post.createdAt).toLocaleDateString("es-Es")}
          </span>
        </div>
      ))}
    </div>
  );
}

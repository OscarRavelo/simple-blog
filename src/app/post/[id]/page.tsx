import { prisma } from "@/lib/prisma";

export async function generateStaticParams() {
  const posts = await prisma.posts.findMany();
  return posts.map((post) => ({ id: post.id.toString() }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await prisma.posts.findUnique({
    where: { id: parseInt(id, 10) },
    include: { Category: true },
  });

  if (!post) return <div>Post not found</div>;
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <span>Category: {post.Category?.name || "Uncategorized"}</span>
    </div>
  );
}

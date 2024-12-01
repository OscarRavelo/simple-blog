import ActionButton from "@/app/components/ActionButton";
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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.content}</p>

      <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded">
        Category: {post.Category?.name || "Uncategorized"}
      </span>
      <div className="mt-6 flex gap-4">
        <ActionButton action="edit" id={id} />
        <ActionButton action="delete" id={id} />
      </div>
    </div>
  );
}

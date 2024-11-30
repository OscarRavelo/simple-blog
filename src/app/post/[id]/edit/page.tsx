import EditPostPage from "@/app/components/EditPostForm";
import { prisma } from "@/lib/prisma";

export default async function EditPost({ params }: { params: { id: string } }) {
  const { id } = await params;

  const post = await prisma.posts.findUnique({
    where: { id: parseInt(id, 10) },
    include: { Category: true },
  });

  if (!post) {
    return (
      <div>
        <h1>Post not found</h1>
        <p>
          the post you're trying to edit doest not exist or has been deleted{" "}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit post</h1>
      <EditPostPage post={post} />
    </div>
  );
}

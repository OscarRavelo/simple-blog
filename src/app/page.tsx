import { prisma } from "@/lib/prisma";
import PostList from "./components/PostList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await prisma.posts.findMany({
    include: {
      Category: true,
    },
  });

  return <PostList posts={posts} />;
}

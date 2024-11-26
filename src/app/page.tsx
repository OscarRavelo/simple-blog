async function getPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(apiUrl);
  const res = await fetch(`${apiUrl}/api/posts`, {
    cache: "no-store",
  });
  console.log("res", res);
  if (!res.ok) {
    throw new Error("failed to fetch in front");
  }

  return res.json();
}
export default async function Home() {
  const posts = await getPosts();
  console.log("posts", posts);
  return (
    <div>
      {posts.map((posts: { id: number; title: string; content: string }) => (
        <div key={posts.id} className="text-white">
          hello
        </div>
      ))}
      <h1>hello world </h1>
    </div>
  );
}

"use client";
export default function EditPostPage({ post }: { post: any }) {
  console.log("post", post);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const content = formData.get("content");
    const categoryName = formData.get("categoryName");
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        title,
        content,
        categoryName,
      }),
    });

    if (response.ok) {
      console.log("Post updated successfully");
    } else {
      console.error("Failed to update post");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" defaultValue={post.title} />
      <textarea name="content" defaultValue={post.content}></textarea>
      <input
        name="categoryName"
        defaultValue={post.Category?.name || "sin categorizar"}
      />
      <button type="submit">Update Post</button>
    </form>
  );
}

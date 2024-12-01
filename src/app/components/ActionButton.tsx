"use client";

import { useRouter } from "next/navigation";

type ActionButtonProps = {
  id: string;
  action: "edit" | "delete";
};

export default function ActionButton({ id, action }: ActionButtonProps) {
  const router = useRouter();
  const handleClick = async () => {
    if (action === "edit") {
      router.push(`/post/${id}/edit`);
    } else if (action === "delete") {
      const confirmed = confirm("Are you sure you want to delete this post?");
      if (confirmed) {
        const response = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Post deleted successfully");
          router.push("/");
        }
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`py-2 px-4 rounded text-white font-semibold ${action === "edit" ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600"}`}
    >
      {`${action} post`.toUpperCase()}
    </button>
  );
}

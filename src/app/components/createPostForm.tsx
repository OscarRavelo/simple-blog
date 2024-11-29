"use client";
import { useState } from "react";
const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("post created successfully!!");
        setFormData({ title: "", content: "", category: "" });
      } else {
        alert("Error creating post");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-6 "
    >
      <h2 className="text-2xl font-bold mb-4">Create new post</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
          placeholder="Enter the Title of the post"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-medium">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focud:outline-none focus:ring-blue-500"
          placeholder="Enter the content of the post "
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 font-medium mb-2"
        >
          category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;

import React from "react";
import { useParams } from "react-router-dom";
import blogData from "./blogData";

function BlogDetail() {
  const { slug } = useParams();

  const blog = blogData.find((b) => b.slug === slug);

  if (!blog) {
    return <div className="p-10">Blog not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-20">

      {/* IMAGE */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-xl mb-8"
      />

      {/* TITLE */}
      <h1
        className="text-4xl font-bold mb-6 text-[#5B3A1A]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {blog.title}
      </h1>

      {/* ✅ THIS IS THE MAIN FIX */}
      <div
        className="prose max-w-none text-[#5B3A1A]"
        style={{ fontFamily: "'Lato', sans-serif" }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}

export default BlogDetail;
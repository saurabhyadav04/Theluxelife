import React from "react";
import { useParams } from "react-router-dom";
import blogData from "./blogData";

function BlogDetail() {
  const { slug } = useParams();
  const blog = blogData.find((b) => b.slug === slug);

  if (!blog) {
    return <div className="p-10 text-center text-2xl">Blog not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-20">
      {/* 1. CSS Injection (This forces the bullets to show up no matter what) */}
      <style>
        {`
          .blog-html-content ul {
            list-style-type: disc !important;
            margin-left: 1.5rem !important;
            margin-top: 1rem !important;
            margin-bottom: 1rem !important;
          }
          .blog-html-content li {
            display: list-item !important;
            margin-bottom: 0.5rem !important;
            list-style: disc !important;
          }
          .blog-html-content h3 {
            font-size: 1.5rem !important;
            font-weight: bold !important;
            margin-top: 1.5rem !important;
            margin-bottom: 0.75rem !important;
          }
          .blog-html-content p {
            margin-bottom: 1rem !important;
          }
        `}
      </style>

      {/* IMAGE */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-xl mb-8 shadow-md"
      />

      {/* TITLE */}
      <h1
        className="text-4xl font-bold mb-6 text-[#5B3A1A]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {blog.title}
      </h1>

      {/* CONTENT WITH FORCED LIST STYLES */}
      <div
        className="blog-html-content text-[#5B3A1A] leading-relaxed"
        style={{ fontFamily: "'Lato', sans-serif" }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}

export default BlogDetail;
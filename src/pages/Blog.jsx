import React from "react";
import { useNavigate } from "react-router-dom";
import blogData from "./blogData";

function Blog() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl py-25 px-5">

      <div className="text-center mb-16">
        <h1
          className="text-4xl font-bold text-[#5B3A1A]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Blog
        </h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogData.map((blog) => (
          <div
            key={blog.id}
            onClick={() => navigate(`/blog/${blog.slug}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-6">
              <h2
                className="mb-3 font-bold text-[#5B3A1A] text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {blog.title}  
              </h2>

              <p
                className="text-[15px] text-[#5B3A1A]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {blog.shortDesc}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Blog;
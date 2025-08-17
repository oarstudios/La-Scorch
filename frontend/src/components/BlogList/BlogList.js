// src/pages/BlogList.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BlogList.css";
import blogImage1 from "../../Images/slider1.jpg";
import blogImage2 from "../../Images/slider1.jpg";

const BlogList = () => {
  const navigate = useNavigate();

  // Blog data (can later come from API)
  const blogs = [
    {
      id: 1,
      title: "How to build a cake like a pro",
      subtitle: "Decorating A Cake Is Like Solving A Puzzle",
      image: blogImage1,
      description: [
        `It All Comes To Us From The New Book, Great Cake Decorating,
        Written By Our Very Own Contributor, Erin Gardner Of
        Wild Orchid Baking Co. Erin Has Been Wowing Us With Her Stylish Designs
        And Teaching Us Her Techniques For Several Years Now.`,
        `Filled With Hundreds Of Creative Ideas, Tips, And Techniques, Erin’s Book Has Something
        For Everyone. Beginners Will Find What They Need To Get Started With Recipes, Tools Of
        The Trade, And The Basics Thoroughly Explained.`
      ],
      link: "/blog", // unique route
    },
    {
      id: 2,
      title: "Cake Decorating Tips",
      subtitle: "Ways You Can Elevate Your Caking Process",
      image: blogImage2,
      description: [
        `It All Comes To Us From The New Book, Great Cake Decorating,
        Written By Our Very Own Contributor, Erin Gardner Of
        Wild Orchid Baking Co.`,
        `This Collection Of Tips Covers Everything From Choosing The Right Sponge And Frosting,
        To Mastering The Art Of Layering And Creating Stunning Centerpieces.`
      ],
      link: "/blog",
    },
  ];

  return (
    <div className="blog-list-container">
      <a href="/" className="back-link">Back</a>
      <h1 className="page-title-blog">Read Blogs</h1>

      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="blog-card"
          onClick={() => navigate(blog.link)}
        >
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <div className="blog-content">
            <h2>{blog.title}</h2>
            <h6 className="subtitle-blog">{blog.subtitle}</h6>
            {blog.description.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

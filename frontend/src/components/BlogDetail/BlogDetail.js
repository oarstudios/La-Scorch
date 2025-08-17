// src/pages/BlogDetail.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BlogDetail.css";
import blogImage1 from "../../Images/slider1.jpg";
import blogImage2 from "../../Images/slider1.jpg";
import blogImage3 from "../../Images/slider1.jpg";

// Temporary single blog data (replace with API/backend later)
const blog = {
  title: "How to build a cake like a pro",
  subtitle: "Decorating A Cake Is Like Solving A Puzzle",
  image: blogImage1,
  content: [
    `It All Comes To Us From The New Book, Great Cake Decorating,
    Written By Our Very Own Contributor, Erin Gardner Of Wild Orchid Baking Co.`,
    `Filled With Hundreds Of Creative Ideas, Tips, And Techniques, Erin’s Book Has Something
    For Everyone. Beginners Will Find What They Need To Get Started With Recipes, Tools Of
    The Trade, And The Basics Thoroughly Explained.`,
    `More Advanced Decorators Will Find Inspiration And Step-By-Step Tutorials To Create Countless Designs.`,
  ],
  readMore: [
    { title: "Cake Decorating Tips", subtitle: "Decorate Your Cake Like A Pro", image: blogImage2 },
    { title: "How To Make Eggless Pancakes", subtitle: "Make Eggless Pancakes!!!", image: blogImage3 },
  ],
};

const BlogDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="bdetail-wrapper">
      <button onClick={() => navigate(-1)} className="bdetail-back-btn">← Back</button>
      <h1 className="bdetail-page-title">Read Blogs</h1>

      <div className="bdetail-main">
        <img src={blog.image} alt={blog.title} className="bdetail-main-img" />
        <h2 className="bdetail-title">{blog.title}</h2>
        <h6 className="bdetail-subtitle">{blog.subtitle}</h6>

        {blog.content.map((para, idx) => (
          <p key={idx} className="bdetail-paragraph">{para}</p>
        ))}

        {/* Read More Section */}
        <h3 className="bdetail-readmore-heading">Read More</h3>
        <div className="bdetail-readmore-grid">
          {blog.readMore.map((rm, index) => (
            <div 
              key={index} 
              className="bdetail-readmore-card" 
              onClick={() => navigate("/blogdetail")} // will later use id
            >
              <img src={rm.image} alt={rm.title} className="bdetail-readmore-img" />
              <h4 className="bdetail-readmore-title">{rm.title}</h4>
              <p className="bdetail-readmore-subtitle">{rm.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

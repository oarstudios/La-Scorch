// src/pages/BlogDetail.js
import React from "react";
import "./BlogDetail.css";
import blogMainImage from "../../Images/slider1.jpg";
import blogImage1 from "../../Images/slider1.jpg";
import blogImage2 from "../../Images/slider1.jpg";

const BlogDetail = () => {
  return (
    <div className="blog-detail-container">
      <a href="/articles" className="back-link">
        Back
      </a>
      <h1 className="page-title-blog">Read Blogs</h1>

      <div className="blg-mid">
        {/* Main Blog */}
        <img src={blogMainImage} alt="Main Blog" className="main-blog-image" />
        <h2 className="blg-title">How to build a cake like a pro</h2>
        <h6 className="subtitle-blog">
          Decorating A Cake Is Like A Solving Puzzle
        </h6>

        <p>
          It All Comes To Us From The New Book,{" "}
          Great Cake Decorating, Written By Our Very Own
          Contributor, Erin Gardner Of Wild Orchid Baking Co.
          Erin Has Been Wowing Us With Her Stylish Designs And Teaching Us Her
          Techniques For Several Years Now. So Needless To Say, We Are Thrilled
          To See Her New Book Out In Stores For All To Enjoy! Filled With
          Hundreds Of Creative Ideas, Tips, And Techniques, Erin’s Book Has
          Something For Everyone. Beginners Will Find What They Need To Get
          Started With Recipes, Tools Of The Trade, And The Basics Thoroughly
          Explained And Paired With Gorgeous Images By
          Mark Davidson Photography.
        </p>

        <p>
          More Advanced Decorators Will Find Inspiration And Step-By-Step
          Tutorials To Create Countless Designs Including Some Of Erin’s Most
          Popular Cakes Like Her Rainbow Hearts Cake And Her Stars And Stripes
          Cake. If You’ve Ever Wondered How Erin Created That Beautifully
          Swagged Bunting, Now You Can Learn How. Within The Pages Of{" "}
          Great Cake Decorating, Erin Is Helping Us Solve The
          Cake Decorating Puzzle. And Today, We’re Excited To Share A Little
          Peek Inside This New Book!
        </p>

        <p>
          So Let’s Get To The Tutorial. We’re Learning How To Level, Split And
          Fill A Cake Like A Pro!
        </p>

        {/* Read More Section */}
        <h3 className="read-more-heading">Read More</h3>
        <div className="read-more-section">
          <div className="read-more-card">
            <img src={blogImage1} alt="Blog 1" />
            <h4>Cake Decorating Tips</h4>
            <p>Decorate Your Cake Like A Pro</p>
          </div>
          <div className="read-more-card">
            <img src={blogImage2} alt="Blog 2" />
            <h4>How To Make Eggless Pancakes</h4>
            <p>Make Eggless Pancakes!!!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

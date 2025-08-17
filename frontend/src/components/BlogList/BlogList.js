// src/pages/BlogList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogList.css';
import blogImage1 from '../../Images/slider1.jpg';
import blogImage2 from '../../Images/slider1.jpg';

const BlogList = () => {
      const navigate = useNavigate();
  return (
    <div className="blog-list-container">
      <a href="/" className="back-link">Back</a>
      <h1 className="page-title-blog">Read Blogs</h1>

      {/* Blog Card 1 */}
      <div className="blog-card" onClick={() => navigate('/blog')}>
        <img src={blogImage1} alt="Blog 1" className="blog-image" />
        <div className="blog-content">
          <h2>How to build a cake like a pro</h2>
          <h6 className="subtitle-blog">Decorating A Cake Is Like A Solving Puzzle</h6>
          <p>
            It All Comes To Us From The New Book, Great Cake Decorating,
            Written By Our Very Own Contributor, Erin Gardner Of
             Wild Orchid Baking Co. Erin Has Been Wowing Us With Her Stylish Designs
            And Teaching Us Her Techniques For Several Years Now. So Needless To Say, We Are Thrilled
            To See Her New Book Out In Stores For All To Enjoy!
          </p>
          <p>
            Filled With Hundreds Of Creative Ideas, Tips, And Techniques, Erin’s Book Has Something
            For Everyone. Beginners Will Find What They Need To Get Started With Recipes, Tools Of
            The Trade, And The Basics Thoroughly Explained. Advanced Bakers Can Learn How To Elevate
            Their Skills With Modern Designs, Perfect Finishes, And Expert-Level Piping Techniques.
            Every Page Is Paired With Gorgeous Photography By Mark Davidson Photography
            That Makes The Experience Even More Inspiring.
          </p>
        </div>
      </div>

      {/* Blog Card 2 */}
      <div className="blog-card" onClick={() => navigate('/blog')}>
        <img src={blogImage2} alt="Blog 2" className="blog-image" />
        <div className="blog-content">
          <h2>Cake Decorating Tips</h2>
          <h6 className="subtitle-blog">Ways You Can Elevate Your Caking Process</h6>
          <p>
            It All Comes To Us From The New Book, Great Cake Decorating,
            Written By Our Very Own Contributor, Erin Gardner Of
            Wild Orchid Baking Co. Erin Has Been Wowing Us With Her Stylish Designs
            And Sharing Her Expertise With Both Hobbyists And Professionals Alike.
          </p>
          <p>
            This Collection Of Tips Covers Everything From Choosing The Right Sponge And Frosting,
            To Mastering The Art Of Layering And Creating Stunning Centerpieces. Whether You’re
            Working On A Birthday Cake, A Wedding Masterpiece, Or Just A Sweet Treat For Your Family,
            These Techniques Will Help You Achieve Professional Results Every Time. Erin’s Advice Is
            Practical, Easy To Follow, And Guaranteed To Boost Your Confidence In The Kitchen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogList;

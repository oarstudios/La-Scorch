import React from "react";
import { Link } from "react-router-dom";
import "./AdminBlogList.css";
import cake from "../../Images/slider1.jpg"

const blogs = [
  {
    id: 1,
    image: cake, // Replace with real image
    title: "How to build a cake like a pro",
    subtitle: "Decorating A Cake is Like A Solving Puzzle",
    description: `It All Comes To Us From The New Book, Great Cake Decorating, Written By Our Very Own Contributor, Erin Gardner Of Wild Orchid Baking Co. Erin Has Been Wowing Us With Her Stylish Designs And Teaching Us Her Techniques For Several Years Now. So Needless To Say, We Are Thrilled To See Her New Book Out In Stores For All To Enjoy! Filled With Hundreds Of Creative Ideas, Tips, And Techniques, Erin's Book Has Something For Everyone. Beginners Will Find What They Need To Get Started With Recipes, Tools Of The Trade, And The Basics Thoroughly Explained And Paired With Gorgeous Images By Mark Davidson Photography.`,
  },
  {
    id: 2,
    image: cake, // Replace with real image
    title: "Cake Decorating Tips",
    subtitle: "Ways You Can Elevate Your Caking Process",
    description: `It All Comes To Us From The New Book, Great Cake Decorating, Written By Our Very Own Contributor, Erin Gardner Of Wild Orchid Baking Co. Erin Has Been Wowing Us With Her Stylish Designs And Teaching Us Her Techniques For Several Years Now. So Needless To Say, We Are Thrilled To See Her New Book Out In Stores For All To Enjoy! Filled With Hundreds Of Creative Ideas, Tips, And Techniques, Erin's Book Has Something For Everyone. Beginners Will Find What They Need To Get Started With Recipes, Tools Of The Trade, And The Basics Thoroughly Explained And Paired With Gorgeous Images By Mark Davidson Photography.`,
  },
];

export default function AdminBlogList() {
  return (
    <div className="admin-bloglist">
      {/* Header */}
      <div className="abl-header">
        <div>
          <p className="abl-back">Back</p>
          <h1 className="abl-title">Blogs</h1>
        </div>
       <button className="abl-add-btn">
  <Link to="/admin/add-blogs" className="abl-add-link">
    Add New Blog
  </Link>
</button>
      </div>

      {/* Blog List */}
      {blogs.map((blog, index) => (
        <div key={blog.id} className="abl-item">
          <div className="abl-card">
            {/* Image */}
            <img src={blog.image} alt={blog.title} className="abl-img" />

            {/* Content */}
            <div className="abl-content">
              <h2 className="abl-blog-title">{blog.title}</h2>
              <p className="abl-subtitle">{blog.subtitle}</p>
              <p className="abl-description">{blog.description}</p>

              {/* Actions */}
              <div className="abl-actions">
                <button className="abl-edit-btn"><Link to="/admin/edit-blog" className="abl-edit-btn">
  Edit
</Link></button>
                <button className="abl-delete-btn">Delete</button>
              </div>
            </div>
          </div>

          {/* Divider */}
          {index !== blogs.length - 1 && <hr className="abl-divider" />}
        </div>
      ))}
    </div>
  );
}

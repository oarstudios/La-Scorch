import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminAddBlog.css";
import cake from "../../Images/slider1.jpg"; // placeholder image

export default function AdminEditBlog({ onUpdate }) {
  const [image, setImage] = useState(cake);
  const [title, setTitle] = useState("How To Build A Cake Like A Pro");
  const [subtitle, setSubtitle] = useState(
    "Decorating A Cake Is Sort Of Like Solving A Puzzle."
  );
  const [content, setContent] = useState(
    `It All Comes To Us From The New Book, Great Cake Decorating, Written By Our Very Own Contributor...`
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    if (title && subtitle && content) {
      const updatedBlog = { title, subtitle, content, image };
      if (onUpdate) {
        onUpdate(updatedBlog);
      }
      alert("Blog updated successfully!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="admin-add-blog">
      <div className="aab-header">
        <div className="aab-back-title">
          <Link to="/admin/blogs-list" className="aab-back">
            Back
          </Link>
          <h1 className="aab-title">Edit Blog</h1>
        </div>
        <button className="aab-publish-btn" onClick={handleUpdate}>
          Update Blog
        </button>
      </div>

      <div className="blog-mid">
        {/* Image upload */}
        <label className="aab-image-upload">
          <img src={image} alt="Preview" className="aab-image-preview" />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </label>

        {/* Title */}
        <input
          type="text"
          placeholder="Heading Of The Blog"
          className="aab-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Subtitle */}
        <input
          type="text"
          placeholder="Subheading"
          className="aab-input"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        {/* Content */}
        <textarea
          placeholder="Add Content Of The Blog Goes Here"
          className="aab-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

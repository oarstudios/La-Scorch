import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminAddBlog.css";

export default function AdminAddBlog({ onPublish }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePublish = () => {
    if (title && subtitle && content) {
      const newBlog = { title, subtitle, content, image };
      onPublish(newBlog);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="admin-add-blog">
      {/* Header */}
      <div className="aab-header">
        <div className="aab-back-title">
          <Link to="/admin/blogs-list" className="aab-back">
            Back
          </Link>
          <h1 className="aab-title">Add New Blog</h1>
        </div>
        <button className="aab-publish-btn" onClick={handlePublish}>
          Publish Blog
        </button>
      </div>
    <div className="blog-mid">

         {/* Image Upload */}
      <label className="aab-image-upload">
        {image ? (
          <img src={image} alt="Preview" className="aab-image-preview" />
        ) : (
          <div className="aab-placeholder" />
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </label>

      {/* Inputs */}
      <input
        type="text"
        placeholder="Heading Of The Blog"
        className="aab-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subheading"
        className="aab-input"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />
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

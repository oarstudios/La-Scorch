import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminAddBlog.css";
import { useDispatch } from "react-redux";
import { createBlog, fetchBlogs } from "../../features/Blogs/BlogSlice";

export default function AdminAddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = async () => {
    if (title && subtitle && content) {
      const formData = new FormData();
      formData.append("heading", title);
      formData.append("subheading", subtitle);
      formData.append("content", content);
      if (imageFile) formData.append("image", imageFile);

      await dispatch(createBlog(formData));
      dispatch(fetchBlogs());
      navigate("/admin/blogs-list");
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
          <h1 className="aab-title">Add New Blog</h1>
        </div>
        <button className="aab-publish-btn" onClick={handlePublish}>
          Publish Blog
        </button>
      </div>
      <div className="blog-mid">
        <label className="aab-image-upload">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="aab-image-preview" />
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

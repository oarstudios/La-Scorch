import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminBlogList.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../features/Blogs/BlogSlice";

const API_URL = "http://localhost:4001"; // (or your production base)

export default function AdminBlogList() {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await dispatch(deleteBlog(id));
      dispatch(fetchBlogs());
    }
  };

  return (
    <div className="admin-bloglist">
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

      {loading ? (
        <div>Loading...</div>
      ) : blogs.length === 0 ? (
        <div style={{ opacity: 0.6, textAlign: "center", marginTop: 20 }}>
          No blogs
        </div>
      ) : (
        blogs.map((blog, index) => (
          <div key={blog._id} className="abl-item">
            <div className="abl-card">
              <img
                src={blog.image ? `${API_URL}${blog.image}` : ""}
                alt={blog.heading}
                className="abl-img"
              />
              <div className="abl-content">
                <h2 className="abl-blog-title">{blog.heading}</h2>
                <p className="abl-subtitle">{blog.subheading}</p>
                <p className="abl-description">{blog.content}</p>
                <div className="abl-actions">
                  <button className="abl-edit-btn">
                    <Link to={`/admin/edit-blog/${blog._id}`} className="abl-edit-btn">
                      Edit
                    </Link>
                  </button>
                  <button
                    className="abl-delete-btn"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            {index !== blogs.length - 1 && <hr className="abl-divider" />}
          </div>
        ))
      )}
    </div>
  );
}

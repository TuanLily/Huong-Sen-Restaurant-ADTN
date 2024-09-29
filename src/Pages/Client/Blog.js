import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlog } from '../../Actions/BlogActions';
import unidecode from 'unidecode';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from "../../Components/Client/Spinner";

export default function Blog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogState = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  // Function to create slug from blog title
  const createSlug = (title) => {
    return unidecode(title)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  // Function to handle blog click
  const handleBlogClick = (title) => {
    const slug = createSlug(title);
    navigate(`/blog-detail/${slug}.html`);
  };

  return (
    <div>
      {/* Hero Header */}
      <div className="container-fluid p-0 py-5 bg-dark hero-header mb-5">
        <div className="containeFr text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Tin tức và mẹo hay
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Tin tức & mẹo hay
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          {/* Blog Posts */}
          <div className="col-md-9">
            <div className="row">
              {/* Show loading or error state */}
              {blogState.loading && <Spinner/>}
              {blogState.error && <div>Error: {blogState.error}</div>}

              {/* Map over the blog posts */}
              {!blogState.loading &&
                blogState.blog?.length > 0 &&
                blogState.blog.map((blog) => (
                  <div className="col-md-4 mb-4" key={blog.id}>
                    <div
                      className="card"
                      onClick={() => handleBlogClick(blog.title)}
                      style={{
                        cursor: "pointer",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease",
                        background: "white",
                      }}
                    >
                      <img
                        src={
                          blog.poster ||
                          "https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250313281452.jpg"
                        }
                        className="card-img-top"
                        alt={blog.title}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          {blog.title.slice(0, 50)}
                        </h5>
                        <p className="card-text">{blog.author}</p>
                      </div>
                    </div>
                  </div>
                ))}

              {/* If no blogs are found */}
              {!blogState.loading && blogState.blog?.length === 0 && (
                <div>No blogs found.</div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-md-3">
            <div className="blog-more">
              <h3 className="mb-4">Có thể bạn quan tâm</h3>
              {blogState.blog?.length > 0 &&
                blogState.blog.slice(0, 4).map((blog) => (
                  <div
                    className="list-group mt-3"
                    key={blog.id}
                    onClick={() => handleBlogClick(blog.title)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease",
                      backgroundColor: "#fff", // Nền trắng giống bài viết
                    }}
                  >
                    <a
                      href="#"
                      className="list-group-item-action"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        color: "inherit", // Đảm bảo màu chữ không thay đổi
                      }}
                    >
                      <div style={{ flex: 1, padding: "10px" }}>
                        <h6
                          className="mb-1"
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          {blog.title}
                        </h6>
                      </div>
                      <img
                        src={
                          blog.poster ||
                          "https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250313281452.jpg"
                        }
                        className="img-fluid"
                        alt={blog.title}
                        style={{
                          height: "100px",
                          objectFit: "cover",
                          width: "100px",
                          marginLeft: "10px",
                        }}
                      />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

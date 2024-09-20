import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetailBySlug } from "../../Actions/BlogDetailActions"; // Import actions for fetching blogs
import { useParams } from "react-router-dom"; // To get the slug from the URL
import { fetchBlog } from "../../Actions/BlogActions";

const DetailBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const blogDetailState = useSelector((state) => state.blog_detail);

  useEffect(() => {
    dispatch(fetchBlogDetailBySlug(slug));
    dispatch(fetchBlog());
  }, [dispatch, slug]);

  return (
    <div>
      <div className="container-fluid p-0 py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Chi Tiết Blog
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/blog">Blogs</a>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Chi Tiết Blog
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {blogDetailState.loading ? (
        <div>Loading...</div>
      ) : blogDetailState.error ? (
        <div>Error: {blogDetailState.error}</div>
      ) : blogDetailState.blogDetail ? (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-9"> {/* Giới hạn chiều rộng */}
              <div className="mb-5"> {/* Căn giữa nội dung */}
                <h1 className="display-4 mb-4">
                  {blogDetailState.blogDetail.title}
                </h1>
                <p className="text-muted">
                  Ngày đăng: {blogDetailState.blogDetail.date} - Tác giả:{" "}
                  {blogDetailState.blogDetail.author}
                </p>
              </div>
              <div className="mb-4 text-center"> {/* Căn giữa hình ảnh */}
                <img
                  src={blogDetailState.blogDetail.poster}
                  className="img-fluid"
                  alt={blogDetailState.blogDetail.title}
                  style={{
                    maxHeight: "500px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
              <div
                className="mb-5 blog-content"
                dangerouslySetInnerHTML={{
                  __html: blogDetailState.blogDetail.content,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <p className="text-center">No blog details available.</p>
        </div>
      )}
    </div>
  );
};

export default DetailBlog;

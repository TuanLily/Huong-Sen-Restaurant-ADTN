import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetailBySlug } from "../../Actions/BlogDetailActions"; // Import actions for fetching blogs
import { Link, useParams } from "react-router-dom"; // To get the slug from the URL
import { fetchBlog } from "../../Actions/BlogActions";
import unidecode from "unidecode";
import { useNavigate } from "react-router-dom";

const DetailBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogDetailState = useSelector((state) => state.blog_detail);
  const blogState = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogDetailBySlug(slug));
    dispatch(fetchBlog()); // Fetch the list of blogs
  }, [dispatch, slug]);

  // Kiểm tra blogState.blogs tồn tại và là một mảng trước khi gọi filter
  const relatedPosts = Array.isArray(blogState.blog)
    ? blogState.blog.filter(
        (blog) => blog.id !== blogDetailState.blogDetail?.id
      )
    : [];

  // Function to create slug from blog title
  const createSlug = (title) => {
    return unidecode(title)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const handleBlogClick = (title) => {
    const slug = createSlug(title);
    window.scrollTo(0, 0); // Cuộn lên đầu trang
    navigate(`/blog-detail/${slug}.html`); // Điều hướng tới trang chi tiết blog với slug mới
  };

  return (
    <div>
      {/* Blog Detail UI */}
      <div className="container-fluid p-0 py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Chi Tiết Blog
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/blog">Bài viết & mẹo hay</Link>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Chi Tiết Bài Viết
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
            <div className="col-md-8 col-lg-9">
              <div className="mb-5">
                <h1 className="display-4 mb-4">
                  {blogDetailState.blogDetail.title}
                </h1>
                <p
                  className="text-muted"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Ngày đăng:{" "}
                  {new Date(
                    blogDetailState.blogDetail.created_at
                  ).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  - Tác giả: {blogDetailState.blogDetail.author}
                </p>
              </div>
              <div className="mb-4 text-center">
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

      {/* Related Posts Section */}
      <div className="container mt-5">
  <h3 className="text-center mb-4">Bài Viết Đề Xuất</h3>
  <div className="row">
    {relatedPosts.length > 0 ? (
      relatedPosts.slice(0, 3).map((relatedPost) => (
        <div className="col-md-4 mb-4" key={relatedPost.id}>
          <div className="card h-100" style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease' }}>
            <img
              src={relatedPost.poster || 'https://via.placeholder.com/200'} // Dự phòng nếu không có poster
              className="card-img-top"
              alt={relatedPost.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
              <h5
                className="card-title"
                style={{
                  height: "3rem", // Chiều cao cố định cho tiêu đề
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {relatedPost.title}
              </h5>
              <p
                className="card-text"
                style={{
                  height: "2rem",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {relatedPost.author || "Không tìm được tác giả."}
              </p>
              <div
                onClick={() => handleBlogClick(relatedPost.title)}
                style={{ cursor: "pointer", marginTop: "auto" }}
                className="btn btn-primary"
              >
                Xem Chi Tiết
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center w-100">Không có bài viết đề xuất nào.</div>
    )}
  </div>
</div>

    </div>
  );
};

export default DetailBlog;

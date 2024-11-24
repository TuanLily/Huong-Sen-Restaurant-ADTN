import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetailBySlug } from "../../Actions/BlogDetailActions";
import { Link, useParams } from "react-router-dom";
import { fetchBlog } from "../../Actions/BlogActions";
import unidecode from "unidecode";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Client/Spinner";
import {
  addCommentBlog,
  fetchCommentBlog,
} from "../../Actions/CommentBlogActions";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { SuccessAlert } from "../../Components/Alert/Alert"; // Import SuccessAlert
import normalAvatar from "../../Assets/Client/Images/default-avatar.png";

const DetailBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogDetailState = useSelector((state) => state.blog_detail);
  const blogState = useSelector((state) => state.blog);
  const commentState = useSelector((state) => state.comment_blog);

  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newComment, setNewComment] = useState({
    content: "",
    blog_id: "",
    user_id: "",
  });
  const [filteredComments, setFilteredComments] = useState([]);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const userIdFromToken = decodedToken.id;
      setUserId(userIdFromToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchBlogDetailBySlug(slug));
    dispatch(fetchBlog());
    dispatch(fetchCommentBlog());
  }, [dispatch, slug]);

  useEffect(() => {
    if (userId) {
      setNewComment((prevComment) => ({
        ...prevComment,
        user_id: userId,
      }));
    }
  }, [userId]);

  useEffect(() => {
    if (blogDetailState.blogDetail) {
      setNewComment((prevComment) => ({
        ...prevComment,
        blog_id: blogDetailState.blogDetail.id,
      }));
    }
  }, [blogDetailState.blogDetail]);

  useEffect(() => {
    const comments = commentState.commentBlog.filter(
      (comment) => comment.blog_id === blogDetailState.blogDetail?.id
    );
    setFilteredComments(comments);
  }, [commentState.commentBlog, blogDetailState.blogDetail]);

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
    window.scrollTo(0, 0);
    navigate(`/blog-detail/${slug}.html`);
  };

  const formatMessageTimestamp = (timestamp) => {
    const now = new Date();
    const timeDifference = now - new Date(timestamp); // Ensure timestamp is treated as Date
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    // Format the timestamp in dd-MM-yyyy HH:mm format
    const formatCustom = (date) => {
      const pad = (num) => num.toString().padStart(2, "0");
      const day = pad(date.getDate());
      const month = pad(date.getMonth() + 1); // Months are zero-indexed
      const year = date.getFullYear();
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());

      return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    // Display time difference in a readable format
    if (minutesDifference < 1) {
      return "Mới nhất"; // "Just now"
    } else if (minutesDifference < 60) {
      return `${minutesDifference} phút trước`; // e.g., "5 minutes ago"
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} giờ trước`; // e.g., "2 hours ago"
    } else {
      // Return formatted timestamp as dd-MM-yyyy HH:mm
      return formatCustom(new Date(timestamp)); // return in dd-MM-yyyy HH:mm format
    }
  };

  // const relatedPosts = Array.isArray(blogState.blog)
  // ? blogState.blog
  //   .filter((blog) => blog.id !== blogDetailState.blogDetail?.id)
  //   .sort(() => Math.random() - 0.5) // Trộn ngẫu nhiên
  //   .slice(0, 3) // Chỉ lấy 3 bài viết ngẫu nhiên
  // : [];

  const relatedPosts = useMemo(() => {
    if (Array.isArray(blogState.blog)) {
      return blogState.blog
        .filter((blog) => blog.id !== blogDetailState.blogDetail?.id)
        .sort(() => Math.random() - 0.5) // Shuffle randomly
        .slice(0, 3); // Take only 3 random posts
    }
    return [];
  }, [blogState.blog, blogDetailState.blogDetail]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    if (!newComment.content.trim()) {
      setErrors({ content: "Nội dung bình luận không được để trống!" });
      return;
    }

    const commentData = {
      blog_id: newComment.blog_id,
      user_id: newComment.user_id,
      content: newComment.content,
    };

    dispatch(addCommentBlog(commentData))
      .then(() => {
        // After successfully adding a comment, fetch the latest comments
        dispatch(fetchCommentBlog("", 1, 10)); // Adjust parameters as needed
        setNewComment((prevComment) => ({ ...prevComment, content: "" }));
        setShowSuccessAlert(true);
      })
      .catch((error) => {
        console.error("Lỗi khi thêm bình luận:", error);
      });
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
        <Spinner />
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

          <SuccessAlert
            open={showSuccessAlert}
            onClose={() => setShowSuccessAlert(false)}
            message="Bình luận đã được thêm thành công!"
          />

          {/* Phần bình luận */}
          <div className="container mt-5">
            <h3 className="text-center mb-4">Bình Luận</h3>
            <div className="comment-card card bg-light border-0 shadow-sm p-3 mb-5 rounded">
              <div className="card-body">
                <div className="mb-4">
                  {commentState.loading ? (
                    <Spinner /> // Show spinner while comments are loading
                  ) : filteredComments.length > 0 ? (
                    filteredComments.map((comment, index) => (
                      <div
                        className="media mb-4 p-3 bg-white rounded border"
                        key={index}
                      >
                        <div className="media-body">
                          <h6 className="mt-0 d-flex align-items-center">
                            <img
                              src={
                                comment.avatar &&
                                comment.avatar.startsWith("http")
                                  ? comment.avatar
                                  : normalAvatar
                              }
                              alt={comment.fullname || "Default Avatar"}
                              className="comment-avatar"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                marginRight: "10px",
                              }}
                            />
                            <span className="text-primary font-weight-bold">
                              {comment.fullname}
                            </span>
                          </h6>
                          <p className="mb-1">{comment.content}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              {formatMessageTimestamp(comment.created_at)}
                            </small>
                            <button
                              className="btn text-muted btn-link btn-sm p-0"
                              style={{ fontSize: "12px" }}
                            >
                              Xóa bình luận
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="alert alert-info">
                      Chưa có bình luận nào!
                    </div>
                  )}
                </div>

                {isLoggedIn && (
                  <form onSubmit={handleCommentSubmit}>
                    <div className="form-group">
                      <textarea
                        className={`form-control bg-white text-dark ${
                          errors.content ? "is-invalid" : ""
                        }`}
                        rows="3"
                        placeholder="Nhập bình luận..."
                        value={newComment.content}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            content: e.target.value,
                          })
                        }
                      />
                      {errors.content && (
                        <div className="invalid-feedback">{errors.content}</div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                      Gửi Bình Luận
                    </button>
                  </form>
                )}
                {!isLoggedIn && (
                  <div className="alert alert-warning" role="alert">
                    Bạn phải <Link to="/login">đăng nhập</Link> để có thể bình
                    luận.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container mt-5">
            <h3 className="text-center mb-4">Có thể bạn quan tâm</h3>
            <div className="row">
              {relatedPosts.map((post) => (
                <div className="col-lg-4 mb-4" key={post.id}>
                  <div
                    className="card border-0 shadow-sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBlogClick(post.title)}
                  >
                    <img
                      className="card-img-top"
                      src={post.poster}
                      alt={post.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text text-muted">{post.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Blog không tồn tại!</p>
      )}
    </div>
  );
};

export default DetailBlog;

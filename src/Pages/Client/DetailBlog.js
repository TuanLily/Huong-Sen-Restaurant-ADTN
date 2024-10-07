import React, { useEffect, useState } from "react";
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

const DetailBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogDetailState = useSelector((state) => state.blog_detail);
  const blogState = useSelector((state) => state.blog);
  const commentState = useSelector((state) => state.comment_blog);

  const [userId, setUserId] = useState(null); // userId null khi chưa đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [newComment, setNewComment] = useState({
    content: "",
    blog_id: "",
    user_id: "",
  });

  // Kiểm tra xem người dùng có đăng nhập không
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const userIdFromToken = decodedToken.id;
      setUserId(userIdFromToken); // Cập nhật userId trong state
      setIsLoggedIn(true); // Đánh dấu là đã đăng nhập
    } else {
      setIsLoggedIn(false); // Người dùng chưa đăng nhập
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
        user_id: userId, // Cập nhật user_id khi userId đã có giá trị
      }));
    }
  }, [userId]);

  useEffect(() => {
    if (blogDetailState.blogDetail) {
      setNewComment((prevComment) => ({
        ...prevComment,
        blog_id: blogDetailState.blogDetail.id, // Cập nhật blog_id từ state
      }));
    }
  }, [blogDetailState.blogDetail]);

  const filteredComments = commentState.commentBlog.filter(
    (comment) => comment.blog_id === blogDetailState.blogDetail?.id
  );

  const relatedPosts = Array.isArray(blogState.blog)
    ? blogState.blog.filter(
        (blog) => blog.id !== blogDetailState.blogDetail?.id
      )
    : [];

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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      blog_id: newComment.blog_id,
      user_id: newComment.user_id,
      content: newComment.content,
    };
    dispatch(addCommentBlog(commentData));
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

          {/* Phần bình luận của khách hàng */}
          <div className="container mt-5">
            <h3 className="text-center mb-4">Bình Luận</h3>
            <div className="comment-card" style={{ backgroundColor: "#fff" }}>
              <div className="card-body">
                {/* Hiển thị danh sách bình luận */}
                <div className="mb-4">
  {filteredComments.length > 0 ? (
    filteredComments.map((comment, index) => (
      <div className="media mb-4" key={index}>
        <div className="media-body">
          <h6 className="mt-0 d-flex align-items-center">
            <img
              src={
                comment.avatar
                  ? comment.avatar.startsWith("http")
                    ? comment.avatar
                    : `${API_BASE_URL}/${comment.avatar}`
                  : "https://via.placeholder.com/40"
              }
              alt={comment.fullname}
              className="comment-avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "15px", // Thêm khoảng cách giữa avatar và tên
              }}
            />
            {comment.fullname}
          </h6>
          <p>{comment.content}</p>
          <div className="text-muted">
            Ngày đăng:{" "}
            {new Date(comment.created_at).toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="alert alert-info">Không có bình luận nào</div>
  )}
</div>


                {/* Form thêm bình luận mới */}
                <hr />
                {isLoggedIn ? (
                  <div className="comment-form-card">
                    <div className="card-body">
                      <h5 className="card-title">Thêm bình luận</h5>
                      <form onSubmit={handleCommentSubmit}>
                        <div className="form-group">
                          <textarea
                            className="form-control mt-1 mb-3"
                            id="commentContent"
                            rows="3"
                            placeholder="Viết bình luận của bạn"
                            value={newComment.content || ""}
                            onChange={(e) =>
                              setNewComment({
                                ...newComment,
                                content: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Hidden inputs to store blog_id and user_id */}
                        <input type="hidden" value={newComment.blog_id} />
                        <input type="hidden" value={newComment.user_id} />

                        <button type="submit" className="btn btn-primary">
                          Gửi bình luận
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-warning" role="alert">
                    Bạn phải <Link to="/login">đăng nhập</Link> để có thể bình
                    luận.
                  </div>
                )}
              </div>
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
        <h3 className="text-center mb-4">Bài viết liên quan</h3>
        <div className="row">
          {relatedPosts.slice(0, 3).map((post) => (
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
  );
};

export default DetailBlog;

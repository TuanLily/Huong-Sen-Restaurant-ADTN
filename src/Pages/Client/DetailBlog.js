import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetailBySlug } from "../../Actions/BlogDetailActions"; // Import actions for fetching blogs
import { Link, useParams } from "react-router-dom"; // To get the slug from the URL
import { fetchBlog } from "../../Actions/BlogActions";
import unidecode from "unidecode";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Client/Spinner";

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
        <Spinner/>
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
  
  {/* Card bao quanh phần bình luận với tên lớp mới */}
  <div className="comment-card" style={{ backgroundColor: '#fff' }}>
    <div className="card-body">
      {/* Hiển thị danh sách bình luận */}
      <div className="mb-4">
        <div className="media mb-4 mt-3">
          <div className="media-body">
            <h5 className="mt-0">
              <img
                src="https://via.placeholder.com/40" // Giảm kích thước avatar
                alt="User Avatar" 
                className="mr-3 rounded-circle"
                style={{ width: "40px", height: "40px" }} // Kích thước mới
              /> Tên khách hàng 1
            </h5>
            Đây là nội dung bình luận của khách hàng.
            <div className="text-muted">
              Ngày đăng: 25/09/2024
            </div>
            {/* Form trả lời bình luận */}
            <div className="mt-2">
              <button 
                className="btn btn-link p-0" 
                onClick={() => document.getElementById('replyForm1').classList.toggle('d-none')}
              >
                Trả lời
              </button>
              <div id="replyForm1" className="d-none mt-2">
                <form>
                  <div className="form-group">
                    <label htmlFor="replyContent1">Nội dung trả lời</label>
                    <textarea
                      className="form-control mt-1"
                      id="replyContent1"
                      rows="2"
                      placeholder="Viết câu trả lời của bạn"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">
                    Gửi trả lời
                  </button>
                </form>
              </div>
            </div>

            {/* Bình luận trả lời */}
            <div className="mt-3" style={{ marginLeft: "20px" }}> {/* Thêm margin-left để thụt vào */}
              <div className="media mb-2">
                <div className="media-body">
                  <h6 className="mt-0">
                    <img
                      src="https://via.placeholder.com/30" // Avatar cho bình luận trả lời
                      alt="User Avatar"
                      className="mr-2 rounded-circle"
                      style={{ width: "30px", height: "30px" }}
                    /> Tên khách hàng 3
                  </h6>
                  Cảm ơn bạn đã bình luận!
                  <div className="text-muted">Ngày đăng: 26/09/2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="media mb-4">
          <div className="media-body">
            <h5 className="mt-0">
              <img
                src="https://via.placeholder.com/40" // Giảm kích thước avatar
                alt="User Avatar" 
                className="mr-3 rounded-circle"
                style={{ width: "40px", height: "40px" }} // Kích thước mới
              /> Tên khách hàng 2
            </h5>
            Một bình luận khác từ khách hàng.
            <div className="text-muted">
              Ngày đăng: 26/09/2024
            </div>
            {/* Form trả lời bình luận */}
            <div className="mt-2">
              <button 
                className="btn btn-link p-0" 
                onClick={() => document.getElementById('replyForm2').classList.toggle('d-none')}
              >
                Trả lời
              </button>
              <div id="replyForm2" className="d-none mt-2">
                <form>
                  <div className="form-group">
                    <label htmlFor="replyContent2">Nội dung trả lời</label>
                    <textarea
                      className="form-control mt-1"
                      id="replyContent2"
                      rows="2"
                      placeholder="Viết câu trả lời của bạn"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">
                    Gửi trả lời
                  </button>
                </form>
              </div>
            </div>

            {/* Bình luận trả lời */}
            <div className="mt-3" style={{ marginLeft: "20px" }}> {/* Thêm margin-left để thụt vào */}
              <div className="media mb-2">
                <div className="media-body">
                  <h6 className="mt-0">
                    <img
                      src="https://via.placeholder.com/30" // Avatar cho bình luận trả lời
                      alt="User Avatar"
                      className="mr-2 rounded-circle"
                      style={{ width: "30px", height: "30px" }}
                    /> Tên khách hàng 4
                  </h6>
                  Cảm ơn bạn đã chia sẻ thông tin này!
                  <div className="text-muted">Ngày đăng: 27/09/2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form thêm bình luận mới */}
      <hr></hr>
      <div className="comment-form-card">
        <div className="card-body">
          <h5 className="card-title">Thêm bình luận</h5>
          <form>
            <div className="form-group">
              <label htmlFor="commentName">Tên của bạn</label>
              <input
                type="text"
                className="form-control mt-1 mb-3"
                id="commentName"
                placeholder="Nhập tên của bạn"
              />
            </div>
            <div className="form-group">
              <label htmlFor="commentContent">Nội dung bình luận</label>
              <textarea
                className="form-control mt-1 mb-3"
                id="commentContent"
                rows="3"
                placeholder="Viết bình luận của bạn"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Gửi bình luận
            </button>
          </form>
        </div>
      </div>
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

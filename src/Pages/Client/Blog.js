import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlog } from '../../Actions/BlogActions';
import unidecode from 'unidecode';
import { Link, useNavigate } from 'react-router-dom';

export default function Blog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogState = useSelector(state => state.blog);

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
          <h1 className="display-3 text-white mb-3 animated slideInDown">Tin tức và mẹo hay</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">Tin tức & mẹo hay</li>
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
              {blogState.loading && <div>Loading...</div>}
              {blogState.error && <div>Error: {blogState.error}</div>}

              {/* Map over the blog posts */}
              {!blogState.loading && blogState.blog?.length > 0 && blogState.blog.map((blog) => (
                <div className="col-md-4 mb-4" key={blog.id}>
                  <div className="card" onClick={() => handleBlogClick(blog.title)} style={{ cursor: 'pointer' }}>
                    <img
                      src={blog.poster || 'https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250313281452.jpg'}
                      className="card-img-top"
                      alt={blog.title}
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{blog.title.slice(0, 50)}</h5>
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
            <div className=''>
              <h5 className="mb-4">Có thể bạn quan tâm</h5>
              {blogState.blog?.length > 0 && blogState.blog.slice(0, 4).map((blog) => (
                <div className="list-group mt-3" key={blog.id}>
                  <a href="#" className=" list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">{blog.title}</h6>
                    </div>
                    <img
                      src={blog.poster || 'https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250313281452.jpg'}
                      className="img-fluid mt-2"
                      alt={blog.title}
                      style={{ height: '100px', objectFit: 'cover' }}
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

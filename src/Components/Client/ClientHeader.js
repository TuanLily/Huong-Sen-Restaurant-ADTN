import React from 'react'
import { Link } from 'react-router-dom';



export default function ClientHeader() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
        <Link to="/" className="navbar-brand p-0">
          <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>Restoran</h1>
          {/* <img src="img/logo.png" alt="Logo"> */}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 pe-4">
            <Link to="/" className="nav-item nav-link">Trang chủ</Link>
            <Link to="/about" className="nav-item nav-link">Về chúng tôi</Link>
            <Link to="/service" className="nav-item nav-link">Service</Link>
            <Link to="/menu" className="nav-item nav-link">Menu</Link>
            <div className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
              <div className="dropdown-menu m-0">
                <Link to="/booking" className="dropdown-item">Booking</Link>
                <Link to="/team" className="dropdown-item">Our Team</Link>
                <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
              </div>
            </div>
            <Link to="/contact" className="nav-item nav-link">Contact</Link>
          </div>
          <Link to="/book-table" className="btn btn-primary py-2 px-4 ms-1 me-1" style={{ color: 'black' }}>
            Đặt bàn
          </Link>
          <Link to="/login" className="btn btn-primary rounded-pill py-2 px-4 ms-1 rounded-pill" style={{ color: 'black' }}>
            <i class="fa-solid fa-user"></i> Đăng nhập
          </Link>
        </div>
      </nav>


    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ClientHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
        <Link to="/" className="navbar-brand p-0 d-flex align-items-center">
          <img src="../../Assets/Client/Images/huong-sen-logo.png" alt="Logo" className="mr-2" />
          <h3 className="ff-secondary text-start text-primary fw-normal m-0">Hương Sen</h3>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 pe-4">
            <Link to="/" className="nav-item nav-link">Trang chủ</Link>
            <Link to="/menu" className="nav-item nav-link">Thực đơn</Link>
            <Link to="/service" className="nav-item nav-link">Dịch vụ</Link>
            <Link to="/menu" className="nav-item nav-link">Tin tức & Mẹo hay</Link>
            <div className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Khác</Link>
              <div className="dropdown-menu m-0">
                <Link to="/about" className="dropdown-item">Về chúng tôi</Link>
                <Link to="/contact" className="dropdown-item">Liên hệ</Link>
              </div>
            </div>
          </div>
          <Link to="/booking" className="btn btn-primary btn-sm rounded py-2 px-4 ms-1 me-1" style={{ color: 'black' }}>
            Đặt bàn
          </Link>
          {user ? (
            <div className="dropdown ms-2">
              <button className="btn dropdown-toggle d-flex align-items-center rounded-pill" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: 'rgb(254,161,21', border: '1px solid rgb(35,36,50)' }}>
                <img src={user.avatar} alt="Avatar" className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                {user.fullname}
              </button>
              <ul className="dropdown-menu rounded-3" aria-labelledby="dropdownMenuButton">
                <li><Link className="dropdown-item" to="/profile">Thông tin tài khoản</Link></li>
                <li><Link className="dropdown-item" to="/my-orders">Đơn hàng của tôi</Link></li>
                <li><Link className="dropdown-item" to="/my-bookings">Đơn đặt bàn của tôi</Link></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm rounded py-2 px-4 ms-1" style={{ color: 'black' }}>
              <i className="fa-solid fa-user"></i> Đăng nhập
            </Link>
          )}
        </div>
      </nav >
    </div >
  )
}

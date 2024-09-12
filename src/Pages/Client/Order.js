import React from "react";
import { NavLink } from "react-router-dom";

export default function Booking() {
  return (
    <div>
      <div className="container-fluid p-0 py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Đặt bàn online
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <a href="#">Trang chủ</a>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Đặt bàn
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container text-center my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="progress-steps d-flex justify-content-between">
              <div className="step">
                <span className="circle">1</span>
                <p>Điền thông tin</p>
              </div>
              <div className="step">
                <span className="circle active">2</span>
                <p>Chọn món</p>
              </div>
              <div className="step">
                <span className="circle">3</span>
                <p>Thanh toán</p>
              </div>
              <div className="step">
                <span className="circle">4</span>
                <p>Xác nhận</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-xxl py-5 px-0 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="row g-0">
          <div className="col-md-6 bg-warning p-5 text-center">
            <h1 className="text-white section-title ff-secondary">
              Thông tin đặt bàn
            </h1>
            <p>
              <strong>Họ tên:</strong> Nguyễn Văn A
            </p>
            <p>
              <strong>Email:</strong> anv@gmail.com
            </p>
            <p>
              <strong>Số điện thoại:</strong> 065789311
            </p>
            <p>
              <strong>Thời gian đặt bàn:</strong> 18/08/2024 20:00
            </p>
            <p>
              <strong>Số người:</strong> 02 người
            </p>
          </div>

          <div className="col-md-6 bg-light p-5">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Món khai vị
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Món chính
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tráng miệng
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Nước uống
                </a>
              </li>
            </ul>

            <div className="col-md-12 bg-light p-4">
              <form>
                <div className="menu-item d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="main1"
                      checked
                      className="me-2"
                    />
                    <label htmlFor="main1" className="mb-0 flex-grow-1">
                      Cá chiên nước mắm
                    </label>
                    <img
                      src="../../Assets/Client/Images/huong-sen-logo.png"
                      style={{ width: "50px" }}
                      alt="Cá chiên"
                      className="img-fluid ms-3"
                    />
                  </div>
                  <div className="quantity-control d-flex align-items-center">
                    <button type="button" className="btn btn-outline-secondary">
                      -
                    </button>
                    <input
                      type="text"
                      value="1"
                      className="form-control text-center mx-2"
                      style={{ width: "50px" }}
                    />
                    <button type="button" className="btn btn-outline-secondary">
                      +
                    </button>
                  </div>
                  <p className="text-primary mb-0 ms-3">70.000đ</p>
                </div>
                <div className="menu-item d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="main1"
                      className="me-2"
                    />
                    <label htmlFor="main1" className="mb-0 flex-grow-1">
                      Cá chiên nước mắm
                    </label>
                    <img
                      src="../../Assets/Client/Images/huong-sen-logo.png"
                      style={{ width: "50px" }}
                      alt="Cá chiên"
                      className="img-fluid ms-3"
                    />
                  </div>
                  <div className="quantity-control d-flex align-items-center">
                    <button type="button" className="btn btn-outline-secondary">
                      -
                    </button>
                    <input
                      type="text"
                      value="1"
                      className="form-control text-center mx-2"
                      style={{ width: "50px" }}
                    />
                    <button type="button" className="btn btn-outline-secondary">
                      +
                    </button>
                  </div>
                  <p className="text-primary mb-0 ms-3">70.000đ</p>
                </div>
                <div className="menu-item d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="main1"
                      checked
                      className="me-2"
                    />
                    <label htmlFor="main1" className="mb-0 flex-grow-1">
                      Cá chiên nước mắm
                    </label>
                    <img
                      src="../../Assets/Client/Images/huong-sen-logo.png"
                      style={{ width: "50px" }}
                      alt="Cá chiên"
                      className="img-fluid ms-3"
                    />
                  </div>
                  <div className="quantity-control d-flex align-items-center">
                    <button type="button" className="btn btn-outline-secondary">
                      -
                    </button>
                    <input
                      type="text"
                      value="1"
                      className="form-control text-center mx-2"
                      style={{ width: "50px" }}
                    />
                    <button type="button" className="btn btn-outline-secondary">
                      +
                    </button>
                  </div>
                  <p className="text-primary mb-0 ms-3">70.000đ</p>
                </div>
                <div className="menu-item d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="main1"
                      checked
                      className="me-2"
                    />
                    <label htmlFor="main1" className="mb-0 flex-grow-1">
                      Cá chiên nước mắm
                    </label>
                    <img
                      src="../../Assets/Client/Images/huong-sen-logo.png"
                      style={{ width: "50px" }}
                      alt="Cá chiên"
                      className="img-fluid ms-3"
                    />
                  </div>
                  <div className="quantity-control d-flex align-items-center">
                    <button type="button" className="btn btn-outline-secondary">
                      -
                    </button>
                    <input
                      type="text"
                      value="1"
                      className="form-control text-center mx-2"
                      style={{ width: "50px" }}
                    />
                    <button type="button" className="btn btn-outline-secondary">
                      +
                    </button>
                  </div>
                  <p className="text-primary mb-0 ms-3">70.000đ</p>
                </div>

                <div className="text-end mt-4">
                  <NavLink to="/pay" className="btn btn-primary py-2 px-5">
                    Tiếp theo
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
                <a href="/">Trang chủ</a>
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
                <span className="circle">2</span>
                <p>Chọn món</p>
              </div>
              <div className="step">
                <span className="circle active">3</span>
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
        className="container-xxl py-5 px-0 wow fadeInUp mx-auto"
        data-wow-delay="0.1s"
        style={{ maxWidth: "1200px" }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm mb-3">
              <h2 className="text-warning fw-bold ff-secondary">
                Thông tin khách hàng
              </h2>
              <p className="mb-0 fw-bold">Huỳnh Trung Hào(Lỏ)</p>
              <p className="mb-0 fw-bold">(+84) 987899032</p>
              <p className="mb-0 fw-bold">
                332, Đường Trần Hoàng Na, Phường Hưng Lợi, Quận Ninh Kiều, Cần
                Thơ
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm mb-3">
              <h2 className="text-warning fw-bold ff-secondary">
                Thông tin đơn đặt bàn
              </h2>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="mb-0 fw-bold">Mã đơn: HS-001</p>
                <p className="mb-0 fw-bold text-end">
                  Thời gian tạo đơn: 19/08/2023 12:05
                </p>
              </div>
              <p className="mb-0 fw-bold">Bàn số: 02</p>
              <p className="fw-bold">Số người: 02 người</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <h5 className="text-warning fw-bold mb-3">
              Đơn hàng (2 sản phẩm)
            </h5>
            <hr />
            <div className="bg-white shadow-sm mb-2 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src="../../Assets/Client/Images/huong-sen-logo.png"
                    alt="Thịt heo xào"
                    className="me-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  <div className="d-flex flex-column">
                    <span className="fw-bold">THỊT HEO XÀO</span>
                    <div className="d-flex align-items-center mt-1">
                      <span
                        className="badge bg-warning rounded-circle"
                        style={{ marginRight: "8px" }}
                      >
                        1
                      </span>
                      <span style={{ color: "#ff9f1a" }}>100.000đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-sm mb-2 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src="../../Assets/Client/Images/huong-sen-logo.png"
                    alt="Thịt heo xào"
                    className="me-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  <div className="d-flex flex-column">
                    <span className="fw-bold">THỊT HEO XÀO</span>
                    <div className="d-flex align-items-center mt-1">
                      <span
                        className="badge bg-warning rounded-circle"
                        style={{ marginRight: "8px" }}
                      >
                        1
                      </span>
                      <span style={{ color: "#ff9f1a" }}>100.000đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-white shadow-sm p-4">
              <h5 className="text-warning fw-bold">Tóm tắt đơn hàng</h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập mã giảm giá"
                  aria-label="Voucher Code"
                  aria-describedby="apply-voucher"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  id="apply-voucher"
                >
                  Áp dụng
                </button>
              </div>
              <div className="d-flex justify-content-between">
                <span>Tạm tính:</span>
                <span>400.000đ</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Tiền giảm do voucher:</span>
                <span>30.000đ</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Tổng cộng:</span>
                <span>370.000đ</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <NavLink to="/order" className="btn btn-dark">
                  <i className="fa-solid fa-chevron-left"></i> Quay lại chọn món
                </NavLink>
                <NavLink to="/confirm" className="btn btn-primary py-2">
                  Đặt bàn
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

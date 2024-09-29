import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Booking() {
  // State để lưu thông tin khách hàng
  const [customerInfo, setCustomerInfo] = useState({
    fullname: "",
    email: "",
    reservation_date: "",
    party_size: "",
    tel: "",
    note: ""
  });

  // Tải dữ liệu đã lưu từ local storage khi component được tải
  useEffect(() => {
    const savedData = localStorage.getItem("customerInfo");
    if (savedData) {
      setCustomerInfo(JSON.parse(savedData));
    }
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Lưu dữ liệu hiện tại của form vào local storage khi nhấn "Tiếp theo"
  const handleNext = () => {
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
    console.log(JSON.parse(localStorage.getItem("customerInfo")));    
  };

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
                <Link to="/">Trang chủ</Link>
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
                <span className="circle active">1</span>
                <p>Điền thông tin</p>
              </div>
              <div className="step">
                <span className="circle">2</span>
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

      <div className="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
        <div className="row g-0">
          <div className="col-md-6">
            <div className="video"></div>
          </div>
          <div className="col-md-6 bg-dark d-flex align-items-center">
            <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                Đặt chỗ
              </h5>
              <h1 className="text-white mb-4">Điền thông tin khách hàng</h1>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        placeholder="Your Name"
                        value={customerInfo.fullname}
                        onChange={handleChange}
                      />
                      <label htmlFor="fullname">Họ và tên bạn</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        value={customerInfo.email}
                        onChange={handleChange}
                      />
                      <label htmlFor="email">Email của bạn</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating date" id="date3">
                      <input
                        type="datetime-local"
                        className="form-control datetimepicker-input"
                        id="reservation_date"
                        placeholder="Date & Time"
                        value={customerInfo.reservation_date}
                        onChange={handleChange}
                      />
                      <label htmlFor="reservation_date">Thời gian dùng bữa</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="party_size"
                        placeholder="Party Size"
                        value={customerInfo.party_size}
                        onChange={handleChange}
                      />
                      <label htmlFor="party_size">Số người ăn</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Your Phone"
                        id="tel"
                        value={customerInfo.tel}
                        onChange={handleChange}
                      />
                      <label htmlFor="tel">Số điện thoại</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="note"
                        style={{ height: "100px" }}
                        value={customerInfo.note}
                        onChange={handleChange}
                      ></textarea>
                      <label htmlFor="note">Ghi chú thêm</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <NavLink
                      to="/confirm"
                      className="btn btn-primary py-2 px-4"
                    >
                      Hoàn tất đặt bàn
                    </NavLink>
                    <NavLink
                      to="/order"
                      className="btn btn-primary py-2 px-5"
                      onClick={handleNext}
                    >
                      Tiếp theo
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

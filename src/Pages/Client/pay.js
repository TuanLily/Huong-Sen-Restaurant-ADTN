import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Pay() {
  // State for customer info and selected products
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    datetime: "",
    quantity: "",
  });

  const [selectedProducts, setSelectedProducts] = useState({});

  // Fetch data from localStorage when the component mounts
  useEffect(() => {
    const savedCustomerInfo = localStorage.getItem("customerInfo");
    if (savedCustomerInfo) {
      setCustomerInfo(JSON.parse(savedCustomerInfo));
    }

    const savedProducts = localStorage.getItem("selectedProducts");
    if (savedProducts) {
      setSelectedProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Format price function
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  // Calculate total price of selected products
  const calculateTotalPrice = () => {
    return Object.values(selectedProducts).reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <div>
      {/* Page Header */}
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
              <li className="breadcrumb-item text-white active" aria-current="page">
                Đặt bàn
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Order Information */}
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

      {/* Customer and Order Details */}
      <div className="container-xxl py-5 px-0 wow fadeInUp mx-auto" data-wow-delay="0.1s" style={{ maxWidth: "1200px" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm mb-3">
              <h2 className="text-warning fw-bold ff-secondary">Thông tin khách hàng</h2>
              <p className="mb-0 fw-bold">Họ tên: {customerInfo.name}</p>
              <p className="mb-0 fw-bold">Email: {customerInfo.email}</p>
              <p className="mb-0 fw-bold">Số điện thoại: {customerInfo.phone}</p>
              <p className="mb-0 fw-bold">Thời gian dùng bữa: {customerInfo.datetime}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm mb-3">
              <h2 className="text-warning fw-bold ff-secondary">Thông tin đơn đặt bàn</h2>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="mb-0 fw-bold">Mã đơn: HS-001</p>
              </div>
              <p className="mb-0 fw-bold">Bàn số: 02</p>
              <p className="fw-bold">Số người: {customerInfo.quantity} người</p>
            </div>
          </div>
        </div>

        {/* Selected Products */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h5 className="text-warning fw-bold mb-3">Đơn hàng ({Object.keys(selectedProducts).length} sản phẩm)</h5>
            <hr />
            {Object.values(selectedProducts).map((product) => (
              <div key={product.id} className="bg-white shadow-sm mb-2 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={product.image || "../../Assets/Client/Images/placeholder.png"}
                      alt={product.name}
                      className="me-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <span className="fw-bold">{product.name}</span>
                      <div className="d-flex align-items-center mt-1">
                        <span
                          className="badge bg-warning rounded-circle"
                          style={{ marginRight: "8px" }}
                        >
                          {product.quantity}
                        </span>
                        <span style={{ color: "#ff9f1a" }}>{formatPrice(product.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
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
                <span>{formatPrice(calculateTotalPrice())}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Thuế (10%):</span>
                <span>{formatPrice((calculateTotalPrice() * 0.1).toFixed(0))}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Giảm giá:</span>
                <span>0đ</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Tổng cộng:</span>
                <span>{formatPrice((calculateTotalPrice() - calculateTotalPrice() * 0.1).toFixed(0))}</span>
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

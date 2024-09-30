import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromotion } from "../../Actions/PromotionActions";

export default function Pay() {
  const dispatch = useDispatch();
  const promotions = useSelector((state) => state.promotion.promotion);

  const [customerInfo, setCustomerInfo] = useState({
    fullname: "",
    email: "",
    tel: "",
    reservation_date: "",
    party_size: "",
    note: "",
  });

  const [selectedProducts, setSelectedProducts] = useState({});
  const [voucherCode, setVoucherCode] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [discount, setDiscount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  useEffect(() => {
    const savedCustomerInfo = localStorage.getItem("customerInfo");
    if (savedCustomerInfo) {
      setCustomerInfo(JSON.parse(savedCustomerInfo));
    }

    const savedProducts = localStorage.getItem("selectedProducts");
    if (savedProducts) {
      setSelectedProducts(JSON.parse(savedProducts));
    }

    setOrderId(generateOrderId());
    setTableNumber(assignTable(customerInfo.quantity));
  }, [customerInfo.quantity]);

  useEffect(() => {
    dispatch(fetchPromotion());
  }, [dispatch]);

  // Format price function
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const formatTime = (datetime) => {
    return new Date(datetime).toLocaleString("vi-VN");
  };

  // Calculate total price of selected products
  const calculateTotalPrice = () => {
    return Object.values(selectedProducts).reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const generateOrderId = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `HS-${randomNumber}`;
  };

  const assignTable = (quantity) => {
    if (quantity <= 2) {
      return "02";
    } else if (quantity <= 4) {
      return "04";
    } else {
      return "Bàn tiệc";
    }
  };

  const applyVoucher = (codeToApply) => {
    const promotion = promotions.find(
      (promo) =>
        promo.code_name.toLowerCase() === codeToApply.toLowerCase() &&
        promo.quantity > 0 &&
        new Date(promo.valid_to) >= new Date()
    );

    if (promotion) {
      setDiscount(promotion.discount);
      if (voucherCode) {
        setSelectedPromotion("");
      }
    } else {
      setDiscount(0);
      alert("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
    }
  };

  const handlePromotionSelect = (selectedCode) => {
    setSelectedPromotion(selectedCode);
    if (selectedCode) {
      applyVoucher(selectedCode);
      setVoucherCode("");
    }
  };

  const calculateFinalTotal = () => {
    const productTotal = calculateTotalPrice();
    const discountAmount = productTotal * (discount / 100);
    const discountedTotal = productTotal - discountAmount;
    const tax = discountedTotal * 0.1;
    const finalTotal = discountedTotal + tax;
    return finalTotal;
  };

  const validPromotions = promotions.filter(
    (promo) => 
      new Date(promo.valid_to) >= new Date() && 
      promo.quantity > 0
  );

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

      {/* Customer and Order Details */}
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
              <p className="mb-0 fw-bold">Họ tên: {customerInfo.name}</p>
              <p className="mb-0 fw-bold">Email: {customerInfo.email}</p>
              <p className="mb-0 fw-bold">
                Số điện thoại: {customerInfo.phone}
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white shadow-sm mb-3">
              <h2 className="text-warning fw-bold ff-secondary">
                Thông tin đơn đặt bàn
              </h2>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <p className="mb-0 fw-bold">Mã đơn: {orderId}</p>
                <p className="mb-0 fw-bold text-end">
                  Thời gian dùng bữa: {formatTime(customerInfo.datetime)}
                </p>
              </div>
              <p className="mb-0 fw-bold">Bàn số: {tableNumber}</p>
              <p className="mb-0 fw-bold">
                Số người: {customerInfo.quantity} người
              </p>
            </div>
          </div>
        </div>

        {/* Selected Products */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h5 className="text-warning fw-bold mb-3">
              Đơn hàng ({Object.keys(selectedProducts).length} sản phẩm)
            </h5>
            <hr />
            {Object.values(selectedProducts).map((product) => (
              <div key={product.id} className="bg-white shadow-sm mb-2 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        product.image ||
                        "../../Assets/Client/Images/placeholder.png"
                      }
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
                        <span style={{ color: "#ff9f1a" }}>
                          {formatPrice(product.price)}
                        </span>
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

              {/* Input for manual voucher code */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập mã giảm giá"
                  aria-label="Voucher Code"
                  aria-describedby="apply-voucher"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => applyVoucher(voucherCode)}
                >
                  Áp dụng
                </button>
              </div>

              {/* Dropdown select for available promotions */}
              <div className="mb-3">
                {validPromotions.length > 0 ? (
                  <select
                    className="form-select"
                    value={selectedPromotion}
                    onChange={(e) => handlePromotionSelect(e.target.value)}
                  >
                    <option value="" disabled>Chọn mã khuyến mãi</option>
                    {validPromotions.map((promo) => (
                      <option key={promo.id} value={promo.code_name}>
                        {promo.code_name} - Giảm {promo.discount}%
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-muted">
                    Không có mã khuyến mãi nào còn hiệu lực.
                  </p>
                )}
              </div>

              <div className="d-flex justify-content-between">
                <span>Tạm tính:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Giảm giá (5%):</span>
                <span>{formatPrice(discountAmount)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Giảm giá:</span>
                <span>
                  {formatPrice(
                    (calculateTotalPrice() * (discount / 100)).toFixed(0)
                  )}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Thuế (10%):</span>
                <span>
                  {formatPrice(
                    Number((calculateTotalPrice() * 0.1).toFixed(0))
                  )}
                </span>
              </div>
              <hr />
              <div>
              <label className="d-flex justify-content-between fw-bold">Phương thức thanh toán</label>
              <input type="radio"/> Thanh toán 30% hóa đơn <br/>
              <input type="radio"/> Thanh toán tổng hóa đơn
              <hr/>
              <input type="radio"/> Thanh toán chuyển khoản <br/>
              <input type="radio"/> Thanh toán tiền mặt
              </div>
              <div className="d-flex justify-content-between fw-bold">
                <span>Tổng cộng:</span>
                <span>
                  {formatPrice(Number(calculateFinalTotal().toFixed(0)))}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <NavLink to="/order" className="btn btn-outline-primary">
                  Quay lại
                </NavLink>
                <NavLink to="/confirm" className="btn btn-primary">
                  Xác nhận thanh toán
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

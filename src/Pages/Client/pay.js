import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromotion } from "../../Actions/PromotionActions";
import { fetchTable } from "../../Actions/TableActions";
import {
  addNewReservation,
  requestMomoPayment,
} from "../../Actions/ReservationActions";
import { addNewReservationDetail } from "../../Actions/Reservation_detailActions";
import { useNavigate } from "react-router-dom";
import { SuccessAlert, DangerAlert } from '../../Components/Alert/Alert';

export default function Pay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const promotions = useSelector((state) => state.promotion.promotion);
  const tables = useSelector((state) => state.table.table);

  const [customerInfo, setCustomerInfo] = useState({
    fullname: "",
    email: "",
    tel: "",
    reservation_date: "",
    party_size: "",
    note: "",
    status: 1,
  });

  const [selectedProducts, setSelectedProducts] = useState({});
  const [voucherCode, setVoucherCode] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [discount, setDiscount] = useState(0);
  const [reservation_code, setReservationCode] = useState(""); // Lưu reservation_code
  const [userId, setUserId] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [isDepositChecked, setIsDepositChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(""); // State để lưu phương thức thanh toán
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openDangerAlert, setOpenDangerAlert] = useState(false);

  useEffect(() => {
    const savedCustomerInfo = localStorage.getItem("customerInfo");
    const savedProducts = localStorage.getItem("selectedProducts");

    // Kiểm tra nếu customerInfo và selectedProducts tồn tại
    if (!savedCustomerInfo && !savedProducts) {
      navigate("/"); // Chuyển hướng về trang chính
      return; // Ngăn không cho tiếp tục thực hiện
    }

    dispatch(fetchTable());

    if (savedCustomerInfo) {
      setCustomerInfo(JSON.parse(savedCustomerInfo));
    }

    if (savedProducts) {
      setSelectedProducts(JSON.parse(savedProducts));
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.id); // Lưu userId
      // console.log("User ID:", user.id); // Log user ID để kiểm tra
    }

    setReservationCode(generateReservationCode());
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(fetchPromotion());
  }, [dispatch]);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const formatTime = (datetime) => {
    return new Date(datetime).toLocaleString("vi-VN");
  };

  const calculateTotalPrice = () => {
    return Object.values(selectedProducts).reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const generateReservationCode = () => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return `HS${randomNumber}`;
  };

  const calculateFinalTotal = (total) => {
    const discountAmount = (total * discount) / 100;
    const tax = total * 0.1;
    return {
      discountedTotal: total - discountAmount,
      finalTotal: total - discountAmount + tax,
    };
  };

  const total_amount = calculateTotalPrice();
  const { discountedTotal, finalTotal } = calculateFinalTotal(total_amount);

  const applyVoucher = (codeToApply) => {
    const promotion = promotions.find(
      (promo) =>
        promo.code_name.toLowerCase() === codeToApply.toLowerCase() &&
        promo.quantity > 0 &&
        new Date(promo.valid_to) >= new Date()
    );

    if (promotion) {
      setDiscount(promotion.discount);
      setSelectedPromotion(promotion.id);
      setVoucherCode("");
      setOpenSuccessAlert(true);
    } else {
      setDiscount(0);
      setSelectedPromotion("");
      setOpenDangerAlert(true);
    }
  };

  const handlePromotionSelect = (selectedCode) => {
    setSelectedPromotion(selectedCode);
    if (selectedCode) {
      applyVoucher(selectedCode);
      setVoucherCode("");
    } else {
      setDiscount(0);
      setSelectedPromotion(""); // Reset if no promotion selected
    }
  };

  const validPromotions = promotions.filter(
    (promo) => new Date(promo.valid_to) >= new Date() && promo.quantity > 0
  );

  const handleDepositChange = (e) => {
    const isChecked = e.target.checked;
    setIsDepositChecked(isChecked);
    if (isChecked) {
      const deposit = finalTotal * 0.3;
      const remaining = finalTotal * 0.7;
      setDepositAmount(deposit);
      setRemainingAmount(remaining);
    } else {
      setDepositAmount(0);
      setRemainingAmount(0);
    }
  };

  const handleCompleteBooking = async () => {
    try {
      const depositAmount = finalTotal * 0.3;

      const orderData = {
        ...customerInfo,
        reservation_code,
        total_amount: finalTotal,
        discount,
        deposit: depositAmount,
        promotion_id: selectedPromotion || null,
        user_id: userId,
      };

      // console.log("Final Total Payment:", finalTotal);
      // console.log("Selected Promotion ID:", selectedPromotion);
      // console.log("Selected Table ID:", tableId);
      // console.log("User ID:", userId);

      // Dispatch reservation action
      const reservation = await dispatch(addNewReservation(orderData));

      localStorage.removeItem("customerInfo");
      localStorage.removeItem("selectedProducts");

      await Promise.all(
        Object.values(selectedProducts).map((product) => {
          const reservationDetail = {
            reservation_id: reservation.id,
            product_id: product.id,
            quantity: product.quantity,
            price: product.price,
          };
          return dispatch(addNewReservationDetail(reservationDetail));
        })
      );

      if (paymentMethod === "MOMO") {
        const momoResponse = await dispatch(
          requestMomoPayment(reservation.id, depositAmount, reservation_code)
        );
        if (momoResponse && momoResponse.payUrl) {
          window.location.href = momoResponse.payUrl;
        }
      } else if (paymentMethod === "VNPay") {
        alert("Tính năng VNPay hiện chưa được hỗ trợ.");
      } else if (paymentMethod === "cash") {
        alert(
          "Thanh toán trực tiếp đã được xác nhận. Vui lòng thanh toán tại quầy."
        );
        navigate("/order-summary");
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error);
      alert("Có lỗi xảy ra khi đặt hàng, vui lòng thử lại.");
    }
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
          {/* Customer Information */}
          <div className="col-12 col-md-6 mb-3">
            <div className="p-4 bg-white shadow-sm">
              <h2 className="text-warning fw-bold ff-secondary">
                Thông tin khách hàng
              </h2>
              <p className="mb-0 fw-bold">Họ tên: {customerInfo.fullname}</p>
              <p className="mb-0 fw-bold">Email: {customerInfo.email}</p>
              <p className="mb-0 fw-bold">Số điện thoại: {customerInfo.tel}</p>
            </div>
          </div>

          {/* Order Information */}
          <div className="col-12 col-md-6 mb-3">
            <div className="p-4 bg-white shadow-sm">
              <h2 className="text-warning fw-bold ff-secondary">
                Thông tin đơn đặt bàn
              </h2>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <p className="mb-0 fw-bold">Mã đơn: {reservation_code}</p>
                <p className="mb-0 fw-bold text-end">
                  Thời gian dùng bữa:{" "}
                  {formatTime(customerInfo.reservation_date)}
                </p>
              </div>
              <p className="mb-0 fw-bold">
                Số người: {customerInfo.party_size} người
              </p>
            </div>
          </div>
        </div>

        {/* Selected Products */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 mb-3">
            <h5 className="text-warning fw-bold mb-3 mx-3 mx-md-0">
              Đơn hàng ({Object.keys(selectedProducts).length} sản phẩm)
            </h5>
            <hr />
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
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
                        className="me-3 img-fluid"
                        style={{
                          maxWidth: "60px",
                          height: "auto",
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
          </div>

          {/* Order Summary */}
          <div className="col-12 col-md-4">
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
                    value={
                      promotions.find((promo) => promo.id === selectedPromotion)
                        ?.code_name || ""
                    }
                    onChange={(e) => handlePromotionSelect(e.target.value)}
                  >
                    <option value="">Chọn mã khuyến mãi</option>
                    {validPromotions.map((promotion) => (
                      <option key={promotion.id} value={promotion.code_name}>
                        {promotion.code_name} ({promotion.discount}%)
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Không có khuyến mãi hiện tại.</p>
                )}
              </div>
              {/* Order total */}
              <div className="d-flex justify-content-between align-items-center">
                <span>Tạm tính:</span>
                <span>{formatPrice(total_amount)}</span>
              </div>
              {/* Discount */}
              <div className="d-flex justify-content-between align-items-center">
                <span>Giảm giá:</span>
                <span>{formatPrice(total_amount * (discount / 100))}</span>
              </div>
              {/* Tax */}
              <div className="d-flex justify-content-between align-items-center">
                <span>Thuế:</span>
                <span>{formatPrice(total_amount * 0.1)}</span>
              </div>
              <hr />
              <p className="fw-bold">
                Tổng thanh toán:{" "}
                <span className="text-warning">{formatPrice(finalTotal)}</span>
              </p>
              <hr />
              {/* Payment Method */}
              <label className="d-flex justify-content-between fw-bold">
                Hình thức thanh toán
              </label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={isDepositChecked}
                    onChange={handleDepositChange}
                  />
                  ㅤThanh toán 30% hóa đơn
                </label>
              </div>

              {isDepositChecked && (
                <div>
                  <label>ㅤ- Tiền cọc (30%): {formatPrice(depositAmount)}</label>
                  <label>ㅤ- Còn lại (70%): {formatPrice(remainingAmount)}</label>
                </div>
              )}

              <hr />
              <div>
                <label className="fw-bold">Phương thức thanh toán</label>
                <div>
                  <input
                    type="radio"
                    id="momo"
                    name="paymentMethod"
                    value="MOMO"
                    checked={paymentMethod === "MOMO"}
                    onChange={() => setPaymentMethod("MOMO")}
                  />
                  <label htmlFor="momo">ㅤThanh toán bằng MOMO</label>
                </div>
                {/* <div>
                  <input
                    type="radio"
                    id="vnpay"
                    name="paymentMethod"
                    value="VNPay"
                    checked={paymentMethod === "VNPay"}
                    onChange={() => setPaymentMethod("VNPay")}
                  />
                  <label htmlFor="vnpay"> Thanh toán bằng VNPay</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <label htmlFor="cash">  Thanh toán bằng Tiền mặt</label>
                </div> */}
              </div>
              <hr />

              {/* Buttons for confirmation and going back */}
              <div className="d-flex justify-content-between mt-3">
                <NavLink to="/order" className="w-30">
                  <button className="btn btn-secondary w-100">Trở lại</button>
                </NavLink>
                <button
                  className="btn btn-primary w-70"
                  onClick={handleCompleteBooking}
                  disabled={!isDepositChecked || !paymentMethod}
                >
                  Xác nhận thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessAlert open={openSuccessAlert} onClose={() => setOpenSuccessAlert(false)} message="Voucher đã được sử dụng!" />
      <DangerAlert open={openDangerAlert} onClose={() => setOpenDangerAlert(false)} message="Mã giảm giá không hợp lệ hoặc đã hết hạn." />
    </div>
  );
}

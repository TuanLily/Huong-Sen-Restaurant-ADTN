import React, { useState, useEffect } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addNewReservation } from "../../Actions/ReservationActions";

export default function Booking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
      fullname: "",
      email: "",
      reservation_date: "",
      party_size: "",
      tel: "",
      note: "",
      status: 1,
  });
  

  useEffect(() => {
    const savedData = localStorage.getItem("customerInfo");
    if (savedData) {
      const customerInfo = JSON.parse(savedData);
      Object.keys(customerInfo).forEach((key) => {
        setValue(key, customerInfo[key]);
      });
    }
  }, [setValue]);

  // Lưu dữ liệu hiện tại của form vào local storage khi nhấn "Tiếp theo"
  const handleNext = (data) => {
    localStorage.setItem("customerInfo", JSON.stringify(data));
    navigate("/order");
    console.log(
      "Saved customer info:",
      JSON.parse(localStorage.getItem("customerInfo"))
    );
  };

  // Xử lý hoàn tất đặt bàn
  const onSubmit = async (data) => {
    localStorage.setItem("customerInfo", JSON.stringify(data));

    // Gửi dữ liệu lên server
    try {
      await dispatch(addNewReservation(data));
      alert("Đặt bàn thành công!");
      localStorage.removeItem("customerInfo"); // Xóa dữ liệu trong local storage
      navigate("/confirm");
    } catch (error) {
      console.error("Error completing booking:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
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

      <div
        className="container-xxl py-5 px-0 wow fadeInUp"
        data-wow-delay="0.1s"
      >
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        placeholder="Your Name"
                        {...register("fullname", {
                          required: "Họ và tên là bắt buộc",
                        })}
                      />
                      <label htmlFor="fullname">Họ và tên bạn</label>
                      {errors.fullname && (
                        <p className="text-danger">{errors.fullname.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        {...register("email", {
                          required: "Email là bắt buộc",
                          pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Email không hợp lệ",
                          },
                        })}
                      />
                      <label htmlFor="email">Email của bạn</label>
                      {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="reservation_date"
                        placeholder="Date & Time"
                        min={new Date().toISOString().slice(0, 16)}
                        {...register("reservation_date", {
                          required: "Thời gian là bắt buộc",
                        })}
                      />
                      <label htmlFor="reservation_date">
                        Thời gian dùng bữa
                      </label>
                      {errors.reservation_date && (
                        <p className="text-danger">
                          {errors.reservation_date.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="party_size"
                        placeholder="Party Size"
                        {...register("party_size", {
                          required: "Số người ăn là bắt buộc",
                        })}
                      />
                      <label htmlFor="party_size">Số người ăn</label>
                      {errors.party_size && (
                        <p className="text-danger">
                          {errors.party_size.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="tel"
                        className="form-control"
                        id="tel"
                        placeholder="Your Phone"
                        {...register("tel", {
                          required: "Số điện thoại là bắt buộc",
                          pattern: {
                            value:
                              /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                            message: "Số điện thoại không đúng định dạng",
                          },
                        })}
                      />
                      <label htmlFor="tel">Số điện thoại</label>
                      {errors.tel && (
                        <p className="text-danger">{errors.tel.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="note"
                        style={{ height: "100px" }}
                        {...register("note")}
                      ></textarea>
                      <label htmlFor="note">Ghi chú thêm</label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button type="submit" className="btn btn-primary py-2 px-4">
                      Hoàn tất đặt bàn
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary py-2 px-5"
                      onClick={handleSubmit(handleNext)}
                    >
                      Tiếp theo
                    </button>
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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const mockBookings = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "vana@example.com",
    phone: "0123456789",
    status: 2,
    date: "2024-10-04",
    guests: 4,
    totalAmount: 2000000,
    depositAmount: 500000,
    remainingAmount: 1500000,
    tableNumber: 5,
  },
  {
    id: 2,
    name: "Tran Thi B",
    email: "thib@example.com",
    phone: "0987654321",
    status: 1,
    date: "2024-09-28",
    guests: 2,
    totalAmount: 800000,
    depositAmount: 200000,
    remainingAmount: 600000,
    tableNumber: 3,
  },
  {
    id: 3,
    name: "Le Van C",
    email: "le.c@example.com",
    phone: "0912345678",
    status: 0,
    date: "2024-10-02",
    guests: 6,
    totalAmount: 3000000,
    depositAmount: 1000000,
    remainingAmount: 2000000,
    tableNumber: 8,
  },
];

export default function MyBooking() {
  const [bookings, setBookings] = useState(mockBookings);

    return (
        <div>
            {/* Hero Section */}
            <div className="py-5 bg-dark hero-header mb-3">
                <div className="container text-center my-5 pt-5 pb-4">
                <h1 className="display-3 text-white mb-3 animated slideInDown">
                    Lịch sử đặt bàn
                </h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center text-uppercase">
                    <li className="breadcrumb-item">
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item text-white active" aria-current="page">
                        Lịch sử
                    </li>
                    </ol>
                </nav>
                </div>
            </div>

            {/* Search Filters */}
            <div className="container mb-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-3">
                                <input type="text" className="form-control" placeholder="Tìm theo tên" />
                            </div>               
                            <div className="col-md-3">
                                <input type="text" className="form-control" placeholder="Tìm theo email" />
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control" placeholder="Tìm theo số điện thoại" />
                            </div>
                            <div className="col-md-3">
                                <input type="text" className="form-control" placeholder="Tìm theo trạng thái" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking List */}
            <div className="container">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div className="card mb-3 shadow-sm" key={booking.id}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span className="fw-bold">{booking.name}</span>
                            <span className={`badge ${getStatusClass(booking.status)} fs-6`}>
                            {getStatusName(booking.status)}
                            </span>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-sm-12 d-flex flex-wrap" style={{ gap: '10px' }}>
                                    <div style={{ flex: '1 1 30%' }}>
                                    <p className="mb-2">
                                        <strong>Email:</strong> {booking.email}
                                    </p>
                                    <p className="mb-2">
                                        <strong>Số bàn:</strong> {booking.tableNumber}
                                    </p>
                                    </div>
                                    <div style={{ flex: '1 1 30%' }}>
                                    <p className="mb-2">
                                        <strong>Số điện thoại:</strong> {booking.phone}
                                    </p>
                                    <p className="mb-2">
                                        <strong>Số người:</strong> {booking.guests}
                                    </p>
                                    </div>
                                    <div style={{ flex: '1 1 30%' }}>
                                    <p className="mb-2">
                                        <strong>Ngày đặt:</strong> {booking.date}
                                    </p>
                                    </div>
                                </div>

                                {/* Payment Info and Action Button */}
                                <div className="col-md-4 col-sm-12 text-md-end text-left mt-3 mt-md-0">
                                    <p className="mb-2">
                                    <strong>Số tiền còn lại:</strong> {booking.remainingAmount.toLocaleString()} VNĐ
                                    </p>
                                    <div>
                                    <button className="btn btn-outline-secondary btn-sm mt-2 me-2" style={{ padding: '0.25rem 0.75rem' }}>
                                        Hủy Đơn
                                    </button>
                                    <button className="btn btn-primary btn-sm mt-2" style={{ padding: '0.25rem 0.75rem' }}>
                                        Xem chi tiết
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))
                    ) : (
                        <div className="text-center">
                            <p>Không tìm thấy kết quả</p>
                        </div>
                    )
                }
            </div>
        </div>
    );

    function getStatusClass(status) {
        switch (status) {
          case 0:
            return "bg-danger"; // Hủy đơn
          case 1:
            return "bg-warning"; // Chờ xác nhận
          case 2:
            return "bg-info"; // Chờ thanh toán cọc
          case 3:
            return "bg-primary"; // Đã thanh toán cọc
          case 4:
            return "bg-success"; // Hoàn tất thanh toán
          case 5:
            return "bg-secondary"; // Hoàn thành đơn (Đã ăn xong)
          default:
            return "bg-secondary"; // Fallback class
        }
    }

    function getStatusName(status) {
        switch (status) {
          case 0:
            return "Hủy đơn";
          case 1:
            return "Chờ xác nhận";
          case 2:
            return "Chờ thanh toán cọc";
          case 3:
            return "Đã thanh toán cọc";
          case 4:
            return "Hoàn tất thanh toán";
          case 5:
            return "Hoàn thành đơn (Đã ăn xong)";
          default:
            return "Không xác định";
        }
    }
}

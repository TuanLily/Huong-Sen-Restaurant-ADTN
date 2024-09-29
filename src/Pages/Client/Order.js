import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductHoatDong } from "../../Actions/ProductActions";

export default function Order() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const [customerInfo, setCustomerInfo] = useState({
    fullname: "",
    email: "",
    tel: "",
    reservation_date: "",
    party_size: "",
    note: "",
  });

  const [selectedProducts, setSelectedProducts] = useState({});

  useEffect(() => {
    dispatch(fetchProductHoatDong());

    const savedData = localStorage.getItem("customerInfo");
    if (savedData) {
      setCustomerInfo(JSON.parse(savedData));
    }

    const savedProducts = localStorage.getItem("selectedProducts");
    if (savedProducts) {
      setSelectedProducts(JSON.parse(savedProducts));
    }
  }, [dispatch]);

  const handleProductChange = (productId, price, image, name) => {
    setSelectedProducts((prev) => {
      const newSelection = { ...prev };
      if (newSelection[productId]) {
        // Nếu sản phẩm đã được chọn, bỏ chọn nó
        delete newSelection[productId];
      } else {
        // Nếu sản phẩm chưa được chọn, thêm nó vào
        newSelection[productId] = {
          id: productId,
          price: parseFloat(price),
          quantity: 1,
          image: image, // Lưu ảnh vào selection
          name: name, // Lưu tên sản phẩm vào selection
        };
      }
      localStorage.setItem("selectedProducts", JSON.stringify(newSelection));
      return newSelection;
    });
  };

  const handleQuantityChange = (productId, change, price, image, name) => {
    setSelectedProducts((prev) => {
      const currentProduct = prev[productId] || { quantity: 0 };
      const newQuantity = Math.max(currentProduct.quantity + change, 0); // Ngăn không cho số lượng âm

      // Nếu số lượng lớn hơn 0, tick sản phẩm; nếu về 0, bỏ tick
      if (newQuantity > 0) {
        return {
          ...prev,
          [productId]: {
            id: productId,
            price: parseFloat(price),
            quantity: newQuantity,
            image: image, // Lưu ảnh sản phẩm
            name: name, // Lưu tên sản phẩm
          },
        };
      } else {
        const newSelection = { ...prev };
        delete newSelection[productId]; // Bỏ tick khi số lượng là 0
        return newSelection;
      }
    });
  };

  const handleNext = () => {
    const filteredProducts = Object.entries(selectedProducts).reduce(
      (acc, [id, product]) => {
        if (product.quantity > 0) {
          // Tính giá sau khi giảm giá
          const finalPrice =
            product.sale_price > 0
              ? product.price - product.sale_price
              : product.price;

          acc[id] = {
            ...product,
            price: finalPrice, // Lưu giá đã tính toán vào selection
          }; // Chỉ bao gồm sản phẩm có số lượng lớn hơn 0
        }
        return acc;
      },
      {}
    );

    localStorage.setItem("selectedProducts", JSON.stringify(filteredProducts));
    console.log(filteredProducts); // Log sản phẩm đã lọc để kiểm tra
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
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

      <div className="container-xxl py-5 px-0">
        <div className="row g-0">
          <div className="col-4 bg-warning p-5">
            <div className="text-center mb-4">
              <h1 className="text-white section-title ff-secondary">
                Thông tin đặt bàn
              </h1>
            </div>
            <p className="mb-4 mt-4 text-dark text-start">
              <strong>Họ tên:</strong> {customerInfo.fullname}
            </p>
            <p className="mb-4 text-dark text-start">
              <strong>Email:</strong> {customerInfo.email}
            </p>
            <p className="mb-4 text-dark text-start">
              <strong>Số điện thoại:</strong> {customerInfo.tel}
            </p>
            <p className="mb-4 text-dark text-start">
              <strong>Thời gian đặt bàn:</strong>{" "}
              {customerInfo.reservation_date}
            </p>
            <p className="mb-4 text-dark text-start">
              <strong>Số người:</strong> {customerInfo.party_size} người
            </p>
            <p className="mb-4 text-dark text-start">
              <strong>Ghi chú:</strong> {customerInfo.note}
            </p>
          </div>

          <div className="col-8 bg-light p-5">
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
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {products.map((product) => (
                  <div
                    className="menu-item d-flex justify-content-between align-items-center mb-3"
                    key={product.id}
                  >
                    <div className="d-flex align-items-center flex-grow-1">
                      <img
                        src={product.image}
                        style={{ width: "50px" }}
                        alt={product.name}
                        className="img-fluid me-3" // Image on the left
                      />
                      <div className="flex-grow-1">
                        <label
                          htmlFor={`product-${product.id}`}
                          className="mb-0"
                        >
                          {product.name}
                        </label>
                        <p className="text-primary mb-0">
                          {formatPrice(product.price - product.sale_price)}
                        </p>
                      </div>
                    </div>
                    <div className="quantity-control d-flex align-items-center">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          handleQuantityChange(
                            product.id,
                            -1,
                            product.price,
                            product.image,
                            product.name
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={selectedProducts[product.id]?.quantity || 0}
                        className="form-control text-center mx-2"
                        style={{ width: "50px" }}
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          handleQuantityChange(
                            product.id,
                            1,
                            product.price - product.sale_price,
                            product.image,
                            product.name
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-between mt-5">
                  <NavLink className="btn btn-secondary" to="/booking">
                    Quay lại
                  </NavLink>
                  <NavLink
                    className="btn btn-primary"
                    to="/pay"
                    onClick={handleNext}
                  >
                    Tiếp tục
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductCategoryHoatDong,
} from "../../Actions/ProductCategoryActions";
import {
  fetchProductHoatDong,
} from "../../Actions/ProductActions";
import unidecode from "unidecode";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Spinner from "../../Components/Client/Spinner";

export default function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const productCategoryState = useSelector((state) => state.product_category);
  const productState = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductCategoryHoatDong());
    dispatch(fetchProductHoatDong());
  }, [dispatch]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const listProduct = (category_id) => {
    return productState.product.filter(
      (product) => product.categories_id === category_id
    );
  };

  // Hàm tạo slug từ tên sản phẩm
  const createSlug = (name) => {
    return unidecode(name) // Chuyển đổi ký tự tiếng Việt thành ký tự không dấu
      .toLowerCase() // Chuyển thành chữ thường
      .replace(/[^a-z0-9]/g, "-") // Thay thế ký tự không phải chữ cái hoặc số bằng dấu -
      .replace(/-+/g, "-") // Thay thế nhiều dấu - bằng 1 dấu -
      .replace(/^-+/, "") // Xóa dấu - ở đầu chuỗi
      .replace(/-+$/, ""); // Xóa dấu - ở cuối chuỗi
  };

  const handleProductClick = (name) => {
    const slug = createSlug(name);
    navigate(`/product-detail/${slug}.html`);
  };

  return (
    <div>
      <div className="container-fluid py-5 bg-dark hero-header mb-5">
        <div className="container text-center my5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Thực Đơn
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <a href="/">Trang Chủ</a>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Thực Đơn
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {productCategoryState.loading && <Spinner />}
      {!productCategoryState.loading &&
        productCategoryState.product_category.length === 0 && (
          <div>No categories found.</div>
        )}
      {productCategoryState.error && (
        <div>Error: {productCategoryState.error}</div>
      )}
      {productCategoryState.product_category &&
        productCategoryState.product_category.map((item, index) => {
          const productsInCategory = listProduct(item.id);
          if (productsInCategory.length === 0) return null;
          return (
            <div className="container-xxl py-5" key={item.id}>
              <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                  <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                    Food Menu
                  </h5>
                  <h1 className="mb-5">{item.name}</h1>
                </div>

                <div
                  className="tab-class text-center wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="tab-content">
                    <div id="tab-1" className="tab-pane fade show p-0 active">
                      <div
                        className="row" // Removed the g-4 class here
                        style={{ rowGap: "20px" }} // Added custom gap to reduce vertical spacing
                      >
                        {productsInCategory.map((product) => (
                          <div className="col-lg-6" key={product.id}>
                            <div
                              className="d-flex align-items-center"
                              onClick={() => handleProductClick(product.name)}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                className="flex-shrink-0 img-fluid rounded"
                                src={product.image}
                                alt={product.name}
                                style={{
                                  width: "150px", // Đặt chiều rộng cố định
                                  height: "150px", // Đặt chiều cao cố định
                                  objectFit: "cover", // Đảm bảo ảnh không bị méo
                                  borderRadius: "10px", // Bo góc ảnh
                                }}
                              />
                              {product.sale_price > 0 ? (
                                <div className="w-100 d-flex flex-column text-start ps-4">
                                  <h5 className="d-flex justify-content-between border-bottom pb-2">
                                    <span>{product.name}</span>
                                    <span
                                      className="text-primary"
                                      style={{
                                        fontSize: "1rem", // Giảm kích thước giá
                                      }}
                                    >
                                      {formatPrice(
                                        product.price - product.sale_price
                                      )}
                                    </span>
                                  </h5>
                                  <div className="d-flex justify-content-end">
                                    <span
                                      className="text-secondary text-decoration-line-through"
                                      style={{
                                        fontSize: "0.85rem",
                                      }}
                                    >
                                      {formatPrice(product.price)}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="w-100 d-flex flex-column text-start ps-4">
                                  <h5 className="d-flex justify-content-between border-bottom pb-2">
                                    <span>{product.name}</span>
                                    <span
                                      className="text-primary"
                                      style={{
                                        fontSize: "1rem", // Giảm kích thước giá
                                      }}
                                    >
                                      {formatPrice(product.price)}
                                    </span>
                                  </h5>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

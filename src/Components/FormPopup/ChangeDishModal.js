import { formatCurrency } from "../../Utils/FormatCurrency";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../../Actions/ProductActions";
import { fetchListProductCategory } from "../../Actions/ProductCategoryActions";
import { sendEmail } from "../../Actions/SendEmailActions";
import Spinner from '../../Components/Client/Spinner';
import { DangerAlert } from '../../Components/Alert/Alert';
import PropTypes from "prop-types";

export const ChangeDishModal = ({ show, onHide, onConfirm, dishes, customerInfo, setOpenSuccess }) => {
  const [dishList, setDishList] = useState(Array.isArray(dishes) ? dishes : []);
  const [selectedCategory, setSelectedCategory] = useState(null); // Trạng thái để theo dõi danh mục được chọn
  const [isSending, setIsSending] = useState(false); // Thêm trạng thái gửi email
  const [errorMessage, setErrorMessage] = useState(""); // Thêm state để lưu thông báo lỗi
  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const loading = useSelector((state) => state.product.loading);
  const productCategoryState = useSelector((state) => state.product_category);

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchListProductCategory());
  }, [dispatch]);

  useEffect(() => {
    setDishList(Array.isArray(dishes) ? dishes : []);
  }, [dishes]);

  const handleQuantityChange = (index, quantity) => {
    const updatedDishList = dishList.map((dish, idx) =>
      idx === index ? { ...dish, quantity } : dish
    );
    if (quantity === 0) {
      handleDeleteDish(index);  // Xóa món khi số lượng = 0
    } else {
      setDishList(updatedDishList);
    }
  };

  const handleDeleteDish = (index) => {
    const updatedDishList = dishList.filter((_, idx) => idx !== index);
    setDishList(updatedDishList);
  };

  const handleAddDish = (product) => {
    // Kiểm tra xem món đã có trong dishList chưa
    const existingDish = dishList.find(dish => dish.product_name === product.name);
    
    // Tính giá món ăn (giá gốc trừ đi sale_price nếu có)
    const priceAfterDiscount = product.sale_price ? product.price - product.sale_price : product.price;
  
    if (!existingDish) {
      // Thêm món vào dishList nếu chưa có
      setDishList([
        ...dishList,
        { product_name: product.name, price: priceAfterDiscount, quantity: 1 },
      ]);
    }
  };
  

  const handleRemoveDish = (product) => {
    const updatedDishList = dishList.filter(dish => dish.product_name !== product.product_name);
    setDishList(updatedDishList);
  };

  const handleConfirm = async () => {
    try {
      setIsSending(true); // Bắt đầu hiển thị spinner

      // Gửi email qua API
      await dispatch(sendEmail(dishes, dishList, customerInfo));
  
      // Hiển thị thông báo thành công
      setOpenSuccess(true);

      setIsSending(false); // Dừng spinner
  
      // Đóng modal
      onHide();
    } catch (error) {
      // Xử lý lỗi (hiển thị thông báo nếu cần)
      setIsSending(false); // Dừng spinner
      setErrorMessage("Đã xảy ra lỗi khi gửi email. Vui lòng thử lại!"); // Cập nhật thông báo lỗi
    }
  };

  // Lọc sản phẩm theo category
  const filteredProducts = selectedCategory 
    ? products.product.filter(product => product.categories_id === selectedCategory) 
    : products.product;

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} role="dialog">
      <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Yêu cầu thay đổi món ăn</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <div>
              <h5 style={{ fontSize: '18px' }}>Thông tin khách hàng</h5>
              <div><strong>Mã đơn hàng:</strong> {customerInfo?.reservation_code}</div>
              <div><strong>Tên khách hàng:</strong> {customerInfo?.fullname}</div>
              <div><strong>Email:</strong> {customerInfo?.email}</div>
              <div><strong>Số điện thoại:</strong> {customerInfo?.tel}</div>
            </div>

            <hr />

            {/* Menu Category Section */}
            <h5 style={{ fontSize: '18px' }}>Chọn danh mục</h5>
            <div className="mb-3">
              <button 
                className={`btn btn-link ${!selectedCategory ? "active" : ""}`}
                onClick={() => setSelectedCategory(null)}
              >
                Tất cả
              </button>
              {productCategoryState.product_category.map(category => (
                <button 
                  key={category.id}
                  className={`btn btn-link ${selectedCategory === category.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Product List Section */}
            <h5 style={{ fontSize: '18px' }}>Danh sách món ăn</h5>
            <div className="mb-3">
              <div className="scrollable-list">
                {loading ? (
                  <p>Đang tải...</p>
                ) : (
                  filteredProducts.map(product => {
                    const dishInList = dishList.find(dish => dish.product_name === product.name);
                    return (
                      <div key={product.id} className="d-flex justify-content-between align-items-center">
                        <span>{product.name} - 
                          {product.sale_price ? (
                            <>
                              <span style={{ textDecoration: 'line-through', marginRight: '8px', fontWeight: 'normal' }}>
                              <span> </span>{formatCurrency(product.price)}
                              </span>
                              <span style={{ color: 'red', fontWeight: 'bold' }}>
                                {formatCurrency(product.price - product.sale_price)}
                              </span>
                            </>
                          ) : (
                            <span style={{ fontWeight: 'bold' }}>
                              <span> </span>{formatCurrency(product.price)}
                            </span>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          checked={!!dishInList}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleAddDish(product);
                            } else {
                              handleRemoveDish(product);
                            }
                          }}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <hr />

            <h5 style={{ fontSize: '18px' }}>Món đã chọn</h5>
            <div className="scrollable-list">
              <ul className="list-group">
                {dishList.length > 0 ? (
                  dishList.map((dish, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                      <div className="d-flex justify-content-between w-100">
                        <span style={{ flex: 2 }}>{dish.product_name}</span>
                        <input
                          type="number"
                          value={dish.quantity}
                          min="0"
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                          className="form-control"
                          style={{ width: "80px", marginRight: "10px" }}
                        />
                        <span style={{ flex: 1 }}>{dish.quantity} x {formatCurrency(dish.price)}</span>
                        <span style={{ flex: 1 }}>{formatCurrency(dish.quantity * dish.price)}</span>
                        <button
                          type="button"
                          className="btn btn-danger ms-2"
                          onClick={() => handleDeleteDish(index)}
                        >
                          Xóa
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>Chưa có món nào được chọn.</p>
                )}
              </ul>
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Đóng
            </button>
            <button type="button" className="btn btn-primary" disabled={dishList.length === 0} onClick={handleConfirm}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      {isSending ? <Spinner /> : "Xác nhận"} {/* Hiển thị spinner khi gửi */}
      {errorMessage && (
        <DangerAlert open={true} message={errorMessage} onClose={() => setErrorMessage("")} />
      )}
    </div>
  );
};

ChangeDishModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      product_name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
  customerInfo: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};
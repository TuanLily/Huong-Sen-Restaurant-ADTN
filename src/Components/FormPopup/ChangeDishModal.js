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
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const loading = useSelector((state) => state.product.loading);
  const productCategoryState = useSelector((state) => state.product_category);

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchListProductCategory());
  }, [dispatch]);
  
  useEffect(() => {
    if (show) {
      setDishList(Array.isArray(dishes) ? dishes : []);
    }
  }, [show, dishes]);
  

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
    // Kiểm tra xem có thay đổi món ăn không
    const isDishChanged = JSON.stringify(dishes) !== JSON.stringify(dishList);
    if (!isDishChanged) {
      setErrorMessage("Vui lòng thay đổi món ăn trước khi gửi yêu cầu!");
      return; // Dừng gửi email nếu không có thay đổi
    }
    
    try {
      setIsSending(true); // Bắt đầu hiển thị spinner

      // Gửi email qua API
      await dispatch(sendEmail(dishes, dishList, customerInfo, currentTotal));
  
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

  const handleCloseModal = () => {
    setDishList([]); // Reset danh sách món
    setSelectedCategory(null); // Reset danh mục chọn
    setPrivacyPolicyChecked(false); // Reset checkbox
    onHide(); // Gọi hàm đóng modal
  };  

  // Lọc sản phẩm theo category
  const filteredProducts = selectedCategory 
  ? products.product.filter(product => product.categories_id === selectedCategory) 
  : products.product;

  // Tính tổng tiền hiện tại
  const currentTotal = dishList.reduce((sum, dish) => sum + dish.price * dish.quantity, 0);

  // Tính 150% của tổng tiền ban đầu (Tổng tiền ban đầu + 20%)
  const maxAllowedTotal = 1.5 * (customerInfo?.total_amount || 0);

  // Kiểm tra điều kiện tổng tiền thay đổi có vượt quá 120% tổng tiền ban đầu không
  const isTotalExceeds120Percent = currentTotal > maxAllowedTotal;
  const isDepositExceeded = currentTotal < (customerInfo?.deposit || 0);

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

            <hr />

            {/* Hiển thị tổng tiền */}
            <div>
              <h5 style={{ fontSize: '18px' }}>Tổng tiền</h5>
              <div><strong>Tổng tiền ban đầu:</strong> {formatCurrency(customerInfo?.total_amount)}</div>
              <div><strong>Tiền đã đặt cọc:</strong> {formatCurrency(customerInfo?.deposit)}</div>
              <div><strong>Tổng tiền sau thay đổi:</strong> {formatCurrency(currentTotal)}</div>
              {isDepositExceeded && (
                <div style={{ color: "red" }}>Tổng tiền hiện tại không được nhỏ hơn tiền đã cọc!</div>
              )}
              {isTotalExceeds120Percent && (
                <div style={{ color: "red" }}>
                  Tổng tiền sau thay đổi không được chênh lệch quá 50% so với tổng tiền ban đầu!
                </div>
              )}
              {(currentTotal > customerInfo.deposit) && !isTotalExceeds120Percent && (
                <div><strong>Tiền phải trả sau khi đến ăn:</strong> {formatCurrency(currentTotal - (customerInfo.deposit ? customerInfo.deposit : 0))}</div>
              )}
            </div>

            <hr />

            {/* Checkbox chính sách */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="privacyPolicy"
                checked={privacyPolicyChecked}
                onChange={(e) => setPrivacyPolicyChecked(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="privacyPolicy">
                Tôi đã hiểu <span style= {{color: '#007bff'}}>Quý khách chỉ có thể gửi yêu cầu 1 lần duy nhất và phải trước ngày đặt 2 tiếng.</span>
              </label>
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              Đóng
            </button>
            <button type="button" className="btn btn-primary" disabled={isTotalExceeds120Percent || isDepositExceeded || !privacyPolicyChecked || JSON.stringify(dishes) === JSON.stringify(dishList)} onClick={handleConfirm}>
              Gửi yêu cầu
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
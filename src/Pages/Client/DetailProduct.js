import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetailBySlug } from '../../Actions/ProductDetailActions'; // Import action để lấy chi tiết sản phẩm bằng slug
import { fetchProduct } from '../../Actions/ProductActions'; // Import action để lấy tất cả sản phẩm
import { useParams } from 'react-router-dom'; // Sử dụng để lấy slug từ URL

const DetailProduct = () => {
  const { slug } = useParams(); // Lấy slug sản phẩm từ URL
  const dispatch = useDispatch();
  const productDetailState = useSelector(state => state.product_detail); // Lấy chi tiết sản phẩm từ Redux store
  const productState = useSelector(state => state.product); // Lấy tất cả sản phẩm từ Redux store

  useEffect(() => {
    dispatch(fetchProductDetailBySlug(slug)); // Gọi API để lấy chi tiết sản phẩm bằng slug
    dispatch(fetchProduct()); // Gọi API để lấy tất cả sản phẩm
  }, [dispatch, slug]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // Lọc các sản phẩm liên quan
  const relatedProducts = productState.product.filter(product => 
    product.categories_id === productDetailState.productDetail?.categories_id &&
    product.id !== productDetailState.productDetail?.id
  );

  return (
    <div>
      <div className="container-fluid py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Chi Tiết Sản Phẩm</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
              <li className="breadcrumb-item"><a href="/menu">Thực đơn</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">Chi Tiết Sản Phẩm</li>
            </ol>
          </nav>
        </div>
      </div>

      {productDetailState.loading ? (
        <div>Loading...</div>
      ) : productDetailState.error ? (
        <div>Error: {productDetailState.error}</div>
      ) : productDetailState.productDetail ? (
        <div className="container">
          <section className="product row bg-danger text-white py-5 align-items-center">
            <div className="product-image col-md-6 text-center mb-4 mb-md-0">
              <img src={productDetailState.productDetail.image} style={{ width: '200px' }} alt={productDetailState.productDetail.name} className="img-fluid rounded" />
            </div>
            <div className="product-info col-md-6">
              <h1 className="product-title">{productDetailState.productDetail.name}</h1>
              <p className="product-description">{productDetailState.productDetail.description}</p>
              <p className="product-price">{formatPrice(productDetailState.productDetail.price - (productDetailState.productDetail.sale_price || 0))}</p>
              {productDetailState.productDetail.sale_price > 0 && (
                <p className="text-danger text-decoration-line-through">{formatPrice(productDetailState.productDetail.price)}</p>
              )}
              <button className="btn btn-outline-light mt-3">Thêm giỏ hàng</button>
            </div>
          </section>

          <section className="related-products mt-5">
            <h2 className="text-center">CÁC MÓN CÙNG THỰC ĐƠN</h2>
            <div className="row text-center mt-3">
              {relatedProducts.length > 0 ? (
                relatedProducts.map(relatedProduct => (
                  <div className="col-md-3" key={relatedProduct.id}>
                    <img src={relatedProduct.image} style={{ width: '150px' }} alt={relatedProduct.name} className="img-fluid" />
                    <p>{relatedProduct.name}</p>
                    <p>{formatPrice(relatedProduct.price - (relatedProduct.sale_price || 0))}</p>
                    {relatedProduct.sale_price > 0 && (
                      <p className="text-danger text-decoration-line-through">{formatPrice(relatedProduct.price)}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center">No related products found.</p>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className="container">
          <p className="text-center">No product details available.</p>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;

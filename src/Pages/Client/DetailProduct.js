import React from 'react';
import ImageGallery from '../../Components/Client/ImageGallery';

const DetailProduct = () => {
  return (
    <div>
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Chi Tiết Sản Phẩm</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item"><a href="#">Pages</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">Chi Tiết Sản Phẩm</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container">
        <section className="product row bg-danger text-white py-5 align-items-center">
          <div className="product-image col-md-6 text-center mb-4 mb-md-0">
            <img src={ImageGallery.menu4} style={{ width: '200px' }} alt="Burger 2 lớp bò, phô-mai" className="img-fluid rounded" />
          </div>
          <div className="product-info col-md-6">
            <h1 className="product-title">Burger 2 lớp bò, phô-mai</h1>
            <p className="product-description">Burger 2 lớp bò và phô-mai.</p>
            <p className="product-price">66,000 VNĐ</p>
            <button className="btn btn-outline-light mt-3">Thêm giỏ hàng</button>
          </div>
        </section>
        
        <section className="related-products mt-5">
          <h2 className="text-center">CÁC MÓN CÙNG THỰC ĐƠN</h2>
          <div className="row text-center mt-3">
            <div className="col-md-3">
            <img src={ImageGallery.menu4} style={{ width: '150px' }} alt="Burger Bò phô mai đặc biệt" className="img-fluid" />
            <p>Burger Bò phô mai đặc biệt</p>
              <p>56,000 VNĐ</p>
            </div>
            <div className="col-md-3">
            <img src={ImageGallery.menu4} style={{ width: '150px' }} alt="Burger Bò phô mai đặc biệt" className="img-fluid" />
            <p>Burger Bò miếng lớn phô-mai</p>
              <p>79,000 VNĐ</p>
            </div>
            <div className="col-md-3">
            <img src={ImageGallery.menu4} style={{ width: '150px' }} alt="Burger Bò phô mai đặc biệt" className="img-fluid" />
            <p>Burger Gà phô-mai đặc biệt</p>
              <p>69,000 VNĐ</p>
            </div>
            <div className="col-md-3">
            <img src={ImageGallery.menu4} style={{ width: '150px' }} alt="Burger Bò phô mai đặc biệt" className="img-fluid" />
            <p>Burger Big Mac</p>
              <p>76,000 VNĐ</p>
            </div>
          </div>
          <div className="row text-center mt-3">
            <div className="col-md-3">
              <img src={ImageGallery.menu4} style={{ width: '150px' }} alt="Burger Bò phô mai đặc biệt" className="img-fluid" />
              <p>Burger Bò phô mai đặc biệt</p>
              <p>56,000 VNĐ</p>
            </div>
            <div className="col-md-3">
            <img src={ImageGallery.menu4} style={{ width: '150px' }} alt="Burger Bò phô mai đặc biệt" className="img-fluid" />
            <p>Burger Bò miếng lớn phô-mai</p>
              <p>79,000 VNĐ</p>
            </div>
            <div className="col-md-3">
            <img src={ImageGallery.menu4} style={{ width: '150px' }} alt="Burger Bò phô mai đặc biệt" className="img-fluid" />
            <p>Burger Gà phô-mai đặc biệt</p>
              <p>69,000 VNĐ</p>
            </div>
            <div className="col-md-3">
            <img src={ImageGallery.menu4} style={{ width: '150px' }} alt="Burger Bò phô mai đặc biệt" className="img-fluid" />
            <p>Burger Big Mac</p>
              <p>76,000 VNĐ</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailProduct;

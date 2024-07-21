import React, { useState } from 'react'
import '../../../Assets/Client/Styles/AuthenStyle/authen.css'
import '../../../Assets/Client/Styles/AuthenStyle/util.css'
import { Link } from 'react-router-dom'

export default function Login() {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card rounded-3 shadow d-flex flex-column flex-md-row">
                            <div className="col-12 col-md-4 d-flex justify-content-center align-items-center p-3">
                                <img
                                    src="../../../Assets/Client/Images/huong-sen-logo.png"
                                    alt="IMG"
                                    className="img-fluid"
                                    style={{ maxWidth: '60%', height: 'auto' }}
                                />
                            </div>
                            <div className="col-12 col-md-8 p-3">
                                <div className="card-body">
                                    <form>
                                        <h2 className="text-center mb-4">Đăng nhập</h2>

                                        <div className="form-group mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                                </span>
                                                <input type="email" className="form-control" id="email" placeholder="Nhập Email" required />
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                                </span>
                                                <input
                                                    type={passwordVisible ? 'text' : 'password'}
                                                    className="form-control"
                                                    id="newPassword"
                                                    placeholder="Nhập mật khẩu mới"
                                                    required
                                                />
                                                <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                                    <i className={passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'} aria-hidden="true"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary btn-block rounded-pill">Đăng nhập</button>
                                        </div>

                                        <div className="text-center mt-3">
                                            <span>Quên </span>
                                            <a href="/forgot-password" className="link-primary">Tài khoản / Mật khẩu?</a>
                                        </div>

                                        <div className="text-center mt-4">
                                            <Link to="/" className="link-primary me-3">
                                                <i className="fa-solid fa-arrow-left ms-2"></i>  Trở lại
                                            </Link>
                                            <Link to="/register" className="link-primary">
                                                Đăng Ký Mới
                                                <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

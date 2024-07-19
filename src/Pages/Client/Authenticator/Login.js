import React from 'react'
import '../../../Assets/Client/Styles/AuthenStyle/authen.css'
import '../../../Assets/Client/Styles/AuthenStyle/util.css'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-4">
                                    <img
                                        src="../../../Assets/Client/Images/hero.png"
                                        alt="IMG"
                                        className="img-fluid"
                                        style={{ width: '40%', height: 'auto' }}
                                    />
                                </div>
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
                                            <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" required />
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary btn-block rounded-pill">Đăng nhập</button>
                                    </div>

                                    <div className="text-center mt-3">
                                        <span>Quên </span>
                                        <a href="#" className="link-primary">Tài khoản / Mật khẩu?</a>
                                    </div>

                                    <div className="text-center mt-4">
                                        <Link to="/" className="link-primary me-3">
                                            Trở lại
                                            <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
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
    )
}

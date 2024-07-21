import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ChangePassword() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleCofirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div>
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card rounded-3 shadow">
                            <div className="card-body p-4">
                                <form>
                                    <h2 className="text-center mb-4">Đổi mật khẩu</h2>

                                    <div className="form-group mb-3">
                                        <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
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

                                    <div className="form-group mb-3">
                                        <label htmlFor="newPassword" className="form-label">Xác nhận mật khẩu mới</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fa fa-lock" aria-hidden="true"></i>
                                            </span>
                                            <input
                                                type={confirmPasswordVisible ? 'text' : 'password'}
                                                className="form-control"
                                                id="newPassword"
                                                placeholder="Nhập mật khẩu mới"
                                                required
                                            />
                                            <span className="input-group-text" onClick={toggleCofirmPasswordVisibility} style={{ cursor: 'pointer' }}>
                                                <i className={confirmPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'} aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>

                             

                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary btn-block rounded-pill">Gửi yêu cầu</button>
                                    </div>

                                    <div className="text-center mt-4">
                                        <Link to="/login" className="link-primary me-3">
                                            <i className="fa-solid fa-arrow-left ms-2"></i> Trở lại
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

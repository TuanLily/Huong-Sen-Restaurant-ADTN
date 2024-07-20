import React from 'react'
import { Link } from 'react-router-dom'

export default function ChangePassword() {
    return (
        <div>
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card rounded-3 shadow d-flex flex-row">
                            <div className="col-md-12 p-3">
                                <div className="card-body">
                                    <form>
                                        <h2 className="text-center mb-4">Đổi mật khẩu</h2>
                                        <div className="form-group mb-3">
                                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                                </span>
                                                <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" required />
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="confirm-password" className="form-label">Xác nhận mật khẩu</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                                </span>
                                                <input type="password" className="form-control" id="confirm-password" placeholder="Nhập xác nhận mật khẩu" required />
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
        </div>
    )
}

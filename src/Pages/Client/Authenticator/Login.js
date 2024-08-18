import React, { useState } from 'react'
import '../../../Assets/Client/Styles/AuthenStyle/authen.css'
import '../../../Assets/Client/Styles/AuthenStyle/util.css'
import { Link, useNavigate } from 'react-router-dom'
import GoogleAuth from '../../../Services/GoogleAuth/GoogleAuth';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../Components/Client/Spinner';
import { fetchLogin } from '../../../Actions/AuthActions';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [serverError, setServerError] = useState(''); // Sử dụng state để lưu trữ lỗi từ máy chủ
    const [loading, setLoading] = useState(false); // Local loading state

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginState = useSelector(state => state.auth);
    const { error } = loginState;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); 
    };

    const onSubmit = async (data) => {
        setLoading(true); // Start spinner
        try {
            await dispatch(fetchLogin(data.email, data.password));
            setLoading(false); 

            setTimeout(() => {
                window.location.href = '/';
                // navigate('/'); 
            }, 2000);
        } catch (err) {
            setLoading(false);
            setServerError(err.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <div>
            <div className="container-fluid py-5 bg-dark hero-header mb-5">
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
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <h2 className="text-center mb-4">Đăng nhập</h2>
                                        <div className="form-group mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                                </span>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Nhập Email"
                                                    {...register('email', {
                                                        required: 'Email là bắt buộc',
                                                        pattern: {
                                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                            message: 'Email không hợp lệ'
                                                        }
                                                    })}
                                                />
                                            </div>
                                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
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
                                                    id="password"
                                                    placeholder="Nhập mật khẩu"
                                                    {...register('password', {
                                                        required: 'Mật khẩu là bắt buộc',
                                                        minLength: {
                                                            value: 8,
                                                            message: 'Mật khẩu phải có ít nhất 8 ký tự'
                                                        },
                                                        pattern: {
                                                            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                                            message: 'Mật khẩu phải bao gồm ít nhất một chữ in hoa và một ký tự đặc biệt'
                                                        }
                                                    })}
                                                />
                                                <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                                    <i className={passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'} aria-hidden="true"></i>
                                                </span>
                                            </div>
                                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                        </div>

                                        {loading && <Spinner />}
                                        {error && <p className="text-danger">{error}</p>}
                                        {serverError && <p className="text-danger">{serverError}</p>}

                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary btn-block rounded-pill" disabled={loading}>
                                                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                            </button>
                                        </div>

                                        <div className="text-center mt-3">
                                            <span>Quên </span>
                                            <Link to="/forgot-password" className="link-primary">Tài khoản / Mật khẩu?</Link>
                                        </div>

                                        <div className="text-center mt-3">
                                            <span>Hoặc đăng nhập bằng</span>
                                            <div className="mt-2">
                                                <GoogleAuth />
                                            </div>
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
    );
}
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ImageUploadComponent from '../../../Components/ImageUpload/ImageUpload';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addNewCustomer, checkEmailExists } from '../../../Actions/AuthActions';
import { DangerAlert, SuccessAlert } from '../../../Components/Alert/Alert';
import Spinner from '../../../Components/Client/Spinner';

export default function Register() {
    const { handleSubmit, register, formState: { errors }, watch, setError } = useForm();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openDangerAlert, setOpenDangerAlert] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const password = watch('password');


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setAvatar(fileNames[0]);
        }
    };

    // Hàm kiểm tra email có tồn tại trên hệ thống chưa.
    const validateEmailExists = async (email) => {
        try {
            const user = await checkEmailExists(email);
            if (user) {
                setError('email', {
                    type: 'manual',
                    message: 'Email đã tồn tại trên hệ thống',
                });
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };


    const onSubmit = async (data) => {
        const emailIsValid = await validateEmailExists(data.email);
        if (!emailIsValid) return;

        const customerData = { ...data, avatar };

        setIsSubmitting(true);

        try {
            await dispatch(addNewCustomer(customerData));
            setOpenSuccessAlert(true);
            setTimeout(() => {
                navigate('/login'); // Điều hướng đến trang đăng nhập
            }, 3000);
        } catch (error) {
            setOpenDangerAlert(true);
            console.error('Đăng ký thất bại:', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="container-fluid py-5 bg-dark hero-header mb-5"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card rounded-3 shadow d-flex flex-row">
                            <div className="col-md-12 p-3">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <h2 className="text-center mb-4">Đăng ký tài khoản thành viên</h2>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="fullname" className="form-label">Họ và Tên</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <i className="fa fa-user" aria-hidden="true"></i>
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="fullname"
                                                            placeholder="Nhập họ và tên"
                                                            {...register('fullname', { required: 'Họ và tên là bắt buộc' })}
                                                        />

                                                    </div>
                                                    {errors.fullname && <p className="text-danger">{errors.fullname.message}</p>}
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
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
                                                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                                    message: 'Email không hợp lệ',
                                                                },
                                                            })}
                                                        />

                                                    </div>
                                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                                            <div className="input-group">
                                                <ImageUploadComponent
                                                    id="avatar"
                                                    onImageUpload={handleImageUpload}
                                                />
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="tel" className="form-label">Số điện thoại</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <i className="fa fa-phone" aria-hidden="true"></i>
                                                        </span>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            id="tel"
                                                            placeholder="Nhập số điện thoại"
                                                            {...register('tel', {
                                                                required: 'Số điện thoại là bắt buộc',
                                                                pattern: {
                                                                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                                                    message: 'Số điện thoại không không đúng định dạng',
                                                                },
                                                            })}
                                                        />
                                                    </div>
                                                    {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <i className="fa fa-home" aria-hidden="true"></i>
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="address"
                                                            placeholder="Nhập địa chỉ"
                                                            {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                                                        />

                                                    </div>
                                                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
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
                                                            placeholder="Nhập mật khẩu mới"
                                                            {...register('password', {
                                                                required: 'Mật khẩu là bắt buộc',
                                                                minLength: {
                                                                    value: 8,
                                                                    message: 'Mật khẩu phải có ít nhất 8 ký tự',
                                                                },
                                                                pattern: {
                                                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                                                    message: 'Mật khẩu phải bao gồm số và ký tự đặc biệt',
                                                                },
                                                            })}
                                                        />
                                                        <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                                            <i className={passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'} aria-hidden="true"></i>
                                                        </span>

                                                    </div>
                                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="confirm-password" className="form-label">Xác nhận mật khẩu</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <i className="fa fa-lock" aria-hidden="true"></i>
                                                        </span>
                                                        <input
                                                            type={confirmPasswordVisible ? 'text' : 'password'}
                                                            className="form-control"
                                                            id="confirm-password"
                                                            placeholder="Nhập mật khẩu xác nhận"
                                                            {...register('confirmPassword', {
                                                                required: 'Mật khẩu xác nhận là bắt buộc',
                                                                validate: (value) => value === password || 'Mật khẩu xác nhận không khớp',
                                                            })}
                                                        />
                                                        <span className="input-group-text" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>
                                                            <i className={confirmPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'} aria-hidden="true"></i>
                                                        </span>
                                                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary btn-block rounded-pill">Đăng ký</button>
                                        </div>

                                        <div className="text-center mt-4">
                                            <Link to="/login" className="link-primary me-3">
                                                <i className="fa-solid fa-arrow-left ms-2"></i> Trở lại
                                            </Link>
                                            <Link to="/Login" className="link-primary">
                                                Bạn đã có tài khoản?
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
            <div>
                {isSubmitting && <Spinner />} {/* Hiển thị spinner nếu đang tải */}
                <SuccessAlert
                    open={openSuccessAlert}
                    onClose={() => setOpenSuccessAlert(false)}
                    message="Đăng ký thành công!"
                />
                <DangerAlert
                    open={openDangerAlert}
                    onClose={() => setOpenDangerAlert(false)}
                    message="Đăng ký thất bại, vui lòng thử lại!"
                />
                {/* Các thành phần khác của form đăng ký */}
            </div>
        </div>

    )
}

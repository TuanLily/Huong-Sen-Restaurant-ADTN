import React, { useEffect, useState } from 'react';
import ImageUploadComponent from '../../Components/ImageUpload/ImageUpload';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { checkPassword, updateProfile } from '../../Actions/UserActions';
import Spinner from '../../Components/Client/Spinner';

import { jwtDecode as jwt_decode } from 'jwt-decode';
import { DangerAlert, SuccessAlert } from '../../Components/Alert/Alert';
import AddressSelector from '../../Components/Location/AddressSelector';
import normalAvatar from '../../Assets/Client/Images/default-avatar.png';


function Account() {
    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { passwordCheckMessage, error } = useSelector(state => state.user);

    const [profile, setProfile] = useState({
        fullname: '',
        email: '',
        avatar: '',
        tel: '',
        address: ''
    });

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false
    });

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const [activeTab, setActiveTab] = useState('updateInfo');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    const [initialAvatar, setInitialAvatar] = useState(null);
    const [initialPassword, setInitialPassword] = useState('');

    const [fullAddress, setFullAddress] = useState('');


    useEffect(() => {
        if (profile.address) {
            setFullAddress(profile.address);
        }
    }, [profile.address]);

    const handleAddressChange = (newAddress) => {
        setFullAddress(newAddress.fullAddress);
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decodedToken = jwt_decode(accessToken);
            const userIdFromToken = decodedToken.id;
            setUserId(userIdFromToken);

            const storedProfile = localStorage.getItem('user');
            if (storedProfile) {
                const parsedProfile = JSON.parse(storedProfile);
                setProfile(parsedProfile);

                // Đặt giá trị ban đầu cho form
                setValue('fullname', parsedProfile.fullname);
                setValue('email', parsedProfile.email);
                setValue('tel', parsedProfile.tel);
                setValue('address', parsedProfile.address);

                // Lưu giá trị avatar và password ban đầu
                setInitialAvatar(parsedProfile.avatar);
                setInitialPassword(parsedProfile.password || '');
            }
        }
    }, [setValue]);


    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setValue('avatar', fileNames[0]);
            setProfile(prev => ({ ...prev, avatar: fileNames[0] }));
        }
    };

    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            navigate('/login');
        }, 2000);
    };

    const handleUpdateProfile = async (data) => {
        console.log('check data', data);
        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        const updatedProfile = {
            ...data,
            address: fullAddress // Sử dụng fullAddress thay vì data.address
        };

        try {
            await dispatch(updateProfile(userId, updatedProfile));
            localStorage.setItem('user', JSON.stringify(updatedProfile));

            setAlert({
                open: true,
                message: 'Cập nhật thông tin thành công!',
                severity: 'success'
            });

            // Cập nhật state profile
            setProfile(updatedProfile);

        } catch (error) {
            console.error('Error updating profile:', error);
            setAlert({
                open: true,
                message: 'Cập nhật thông tin thất bại!',
                severity: 'error'
            });
        }
    };

    useEffect(() => {
        const alertStatus = localStorage.getItem('profileUpdateStatus');
        if (alertStatus) {
            setAlert({
                open: true,
                message: alertStatus === 'success' ? 'Cập nhật thông tin thành công!' : 'Cập nhật thông tin thất bại!',
                severity: alertStatus === 'success' ? 'success' : 'error'
            });
            localStorage.removeItem('profileUpdateStatus');
        }
    }, []);


    useEffect(() => {
        if (passwordCheckMessage) {
            if (passwordCheckMessage === 'Password is correct') {
                console.log('Mật khẩu chính xác');
            } else {
                console.log('Sai mật khẩu');
            }
        }
        if (error) {
            console.log('Error:', error);
        }
    }, [passwordCheckMessage, error]);

    const handleChangePassword = async (data) => {
        try {
            setIsLoading(true);

            // Kiểm tra mật khẩu hiện tại
            const email = profile.email;
            const currentPassword = getValues('currentPassword');
            const passwordCheckMessage = await dispatch(checkPassword(email, currentPassword));

            console.log('Kết quả kiểm tra mật khẩu:', passwordCheckMessage);

            // Nếu mật khẩu đúng, tiến hành cập nhật mật khẩu mới
            if (passwordCheckMessage === 'Password is correct') {
                const updatedProfile = {
                    password: data.newPassword
                };

                await dispatch(updateProfile(userId, updatedProfile));

                setAlert({
                    open: true,
                    message: 'Đổi mật khẩu thành công!',
                    severity: 'success'
                });

            }
        } catch (error) {
            console.error(error);
            setAlert({
                open: true,
                message: 'Đổi mật khẩu thất bại!',
                severity: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="container-fluid p-0 py-5 bg-dark hero-header mb-5">
                        <div className="container text-center my-5 pt-5 pb-4">
                            <h1 className="display-3 text-white mb-3">Thông Tin Tài Khoản</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center text-uppercase">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Trang chủ</Link>
                                    </li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">
                                        Thông tin tài khoản
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="container-xxl py-5">
                        <div className="container">
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="bg-white p-4 rounded text-center">
                                        <img src={profile.avatar || normalAvatar} alt="Avatar" className="img-fluid rounded-circle mb-3" width={140} />
                                        <br />
                                        <h5 className="section-title ff-secondary fw-normal text-primary">Họ và Tên</h5>
                                        <p>{profile.fullname}</p>
                                        <h5 className="section-title ff-secondary fw-normal text-primary">Email</h5>
                                        <p>{profile.email}</p>
                                        <h5 className="section-title ff-secondary fw-normal text-primary">Số Điện Thoại</h5>
                                        <p>{profile.tel}</p>
                                        <h5 className="section-title ff-secondary fw-normal text-primary">Địa chỉ</h5>
                                        <p>{profile.address}</p>
                                        <button className="btn btn-danger w-100 mt-3" onClick={() => handleLogout()}>Đăng Xuất</button>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${activeTab === 'updateInfo' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('updateInfo')}
                                            >
                                                Cập Nhật Thông Tin
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${activeTab === 'changePassword' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('changePassword')}
                                            >
                                                Đổi Mật Khẩu
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content p-4 bg-white rounded-bottom">
                                        {activeTab === 'updateInfo' && (
                                            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="fullname"
                                                                placeholder="Họ và Tên"
                                                                {...register('fullname', { required: "Họ và tên là bắt buộc" })}
                                                            />
                                                            <label htmlFor="fullname">Họ và Tên</label>
                                                            {errors.fullname && <span className="text-danger">{errors.fullname.message}</span>}
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                id="email"
                                                                placeholder="Email"
                                                                {...register('email', { required: "Email là bắt buộc" })}
                                                            />
                                                            <label htmlFor="email">Email</label>
                                                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input
                                                                type="tel"
                                                                className="form-control"
                                                                id="tel"
                                                                placeholder="Số Điện Thoại"
                                                                {...register('tel', {
                                                                    required: 'Số điện thoại là bắt buộc',
                                                                    pattern: {
                                                                        value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                                                        message: 'Số điện thoại không đúng định dạng',
                                                                    },
                                                                })}
                                                            />
                                                            <label htmlFor="tel">Số Điện Thoại</label>
                                                            {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="avatar">Ảnh đại diện</label>
                                                            <ImageUploadComponent
                                                                id="avatar"
                                                                onImageUpload={handleImageUpload}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className='form-floating'>
                                                            <label htmlFor="address" style={{ marginTop: -10, opacity: '50%' }}>Địa chỉ</label>
                                                            <AddressSelector
                                                                onChange={handleAddressChange}
                                                                initialAddress={profile.address}
                                                            />
                                                            {errors.address && <p className="text-danger">{errors.address.message}</p>}
                                                        </div>

                                                    </div>
                                                    <div className="col-12 mt-3">
                                                        <button className="btn btn-primary w-100 py-3 rounded-pill" type="submit">Cập Nhật</button>
                                                    </div>
                                                    <div className="col-12 mt-2">
                                                        <button className="btn btn-secondary w-100 py-3 rounded-pill" type="reset">Đặt Lại</button>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                        {activeTab === 'changePassword' && (
                                            <form onSubmit={handleSubmit(handleChangePassword)}>
                                                <div className="row g-3">
                                                    <div className="col-12 position-relative">
                                                        <div className="form-floating">
                                                            <input
                                                                type={showPassword.currentPassword ? "text" : "password"}
                                                                className="form-control"
                                                                id="currentPassword"
                                                                placeholder="Mật Khẩu Cũ"
                                                                {...register('currentPassword', {
                                                                    required: "Mật khẩu cũ là bắt buộc",
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
                                                            <label htmlFor="currentPassword">Mật Khẩu Cũ</label>
                                                            <i
                                                                className={`fa ${showPassword.currentPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y pe-3`}
                                                                onClick={() => togglePasswordVisibility('currentPassword')}
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                            {errors.currentPassword && <span className="text-danger">{errors.currentPassword.message}</span>}
                                                            {error && <span className="text-danger">{error}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 position-relative">
                                                        <div className="form-floating">
                                                            <input
                                                                type={showPassword.newPassword ? "text" : "password"}
                                                                className="form-control"
                                                                id="newPassword"
                                                                placeholder="Mật Khẩu Mới"
                                                                {...register('newPassword', {
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
                                                            <label htmlFor="newPassword">Mật Khẩu Mới</label>
                                                            <i
                                                                className={`fa ${showPassword.newPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y pe-3`}
                                                                onClick={() => togglePasswordVisibility('newPassword')}
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                            {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 position-relative">
                                                        <div className="form-floating">
                                                            <input
                                                                type={showPassword.confirmNewPassword ? "text" : "password"}
                                                                className="form-control"
                                                                id="confirmNewPassword"
                                                                placeholder="Nhập Lại Mật Khẩu Mới"
                                                                {...register('confirmNewPassword', {
                                                                    required: 'Xác nhận mật khẩu là bắt buộc',
                                                                    validate: (value) =>
                                                                        value === getValues('newPassword') || 'Mật khẩu không khớp',
                                                                })}
                                                            />
                                                            <label htmlFor="confirmNewPassword">Nhập Lại Mật Khẩu Mới</label>
                                                            <i
                                                                className={`fa ${showPassword.confirmNewPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y pe-3`}
                                                                onClick={() => togglePasswordVisibility('confirmNewPassword')}
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                            {errors.confirmNewPassword && <span className="text-danger">{errors.confirmNewPassword.message}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button className="btn btn-primary w-100 py-3 rounded-pill" type="submit">Đổi Mật Khẩu</button>
                                                    </div>
                                                    <div className="col-12">
                                                        <button className="btn btn-secondary w-100 py-3 rounded-pill" type="reset">Đặt Lại</button>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Hiển thị thông báo ở đây*/}
                        <SuccessAlert open={alert.open && alert.severity === 'success'} onClose={() => setAlert({ ...alert, open: false })} message={alert.message} />
                        <DangerAlert open={alert.open && alert.severity === 'error'} onClose={() => setAlert({ ...alert, open: false })} message={alert.message} />
                    </div>
                </>
            )}

        </div>
    );
}

export default Account;

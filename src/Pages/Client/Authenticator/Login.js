import React from 'react'
import '../../../Assets/Client/Styles/AuthenStyle/authen.css'
import '../../../Assets/Client/Styles/AuthenStyle/util.css'

export default function Login() {
    return (
        <div>
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                        <div class="login100-pic js-tilt" data-tilt>
                            <img src="../../../Assets/Client/Images/hero.png" alt="IMG" />
                        </div>

                        <form class="login100-form validate-form">
                            <span class="login100-form-title">
                                Đăng nhập
                            </span>

                            <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input class="input100" type="text" name="email" placeholder="Nhập Email" />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div class="wrap-input100 validate-input" data-validate="Password is required">
                                <input class="input100" type="password" name="pass" placeholder="Nhập mật khẩu" />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div class="container-login100-form-btn">
                                <button class="login100-form-btn">
                                    Đăng nhập
                                </button>
                            </div>

                            <div class="text-center p-t-12">
                                <span class="txt1">
                                    Quên
                                </span>
                                <a class="txt2" href="#">
                                    Tài khoản / Mật khẩu?
                                </a>
                            </div>

                            <div class="text-center p-t-136">
                                <a class="txt2" href="/">
                                    Trở lại /
                                    <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </a>

                                <a class="txt2" href="/Register">
                                    Tạo tài khoản mới
                                    <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>        </div>
    )
}

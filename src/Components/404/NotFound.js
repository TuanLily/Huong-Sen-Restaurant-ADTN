import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-light'>
            <div class="text-center">
                <h1 class="display-1 font-weight-bold text-dark">404</h1>
                <p class="h4 mb-4">Trang không tìm thấy</p>
                <p class="lead">Xin lỗi, trang bạn đang tìm kiếm không tồn tại!</p>
                <Link to="/" class="btn btn-primary mt-3">Trở về trang chủ</Link>
            </div>
        </div>
    )
}

import { combineReducers } from "redux";
import authReducer from "./AuthReducers";
import productCategoryReducer from "./ProductCategoryReducers";
import productReducer from "./ProductReducers";
import userReducer from "./UserReducers";
import blogReducer from "./BlogReducers";
import productDetailReducer from "./ProductDetailReducers";
import contactReducer from "./ContactReducers";
import blogDetailReducer from "./BlogDetailReducers";
import promotionReducer from "./PromotionReducers";
import CommentBlogReducer from './CommentBlogReducers';
import MyBookingReducer from './MyBookingReducers';
import ReservationDetailReducer from './ReservationDetailOfTrangReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    product_category: productCategoryReducer,
    user: userReducer,
    blog: blogReducer,
    product_detail: productDetailReducer,
    contact: contactReducer,
    blog_detail: blogDetailReducer,
    promotion: promotionReducer,
    comment_blog: CommentBlogReducer,
    blog_detail: blogDetailReducer,
    my_booking: MyBookingReducer,
    my_booking_detail: ReservationDetailReducer,
});

export default rootReducer;
import { combineReducers } from "redux";
import authReducer from "./AuthReducers";
import productCategoryReducer from "./ProductCategoryReducers";
import productReducer from "./ProductReducers";
import userReducer from "./UserReducers";
import blogReducer from "./BlogReducers";
import productDetailReducer from "./ProductDetailReducers";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    product_category: productCategoryReducer,
    user: userReducer,
    blog: blogReducer,
    product_detail: productDetailReducer
});

export default rootReducer;
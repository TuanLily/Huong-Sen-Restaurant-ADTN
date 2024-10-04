// Action Types
export const ADD_NEW_RESERVATION_REQUEST = "ADD_NEW_RESERVATION_REQUEST";
export const ADD_NEW_RESERVATION_SUCCESS = "ADD_NEW_RESERVATION_SUCCESS";
export const ADD_NEW_RESERVATION_FAILURE = "ADD_NEW_RESERVATION_FAILURE";

// Import API config
import { API_ENDPOINT, API_DATA } from "../Config/Client/APIs";
import http from "../Utils/Http";

// Action Creators
export const addNewReservationRequest = () => ({
    type: ADD_NEW_RESERVATION_REQUEST,
});

export const addNewReservationSuccess = reservation => ({
    type: ADD_NEW_RESERVATION_SUCCESS,
    payload: reservation,
});

export const addNewReservationFailure = error => ({
    type: ADD_NEW_RESERVATION_FAILURE,
    payload: error,
});

// Thunk to Add a New Reservation
export const addNewReservation = (reservationData) => {
    return async (dispatch) => {
        dispatch(addNewReservationRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.reservations}`, reservationData);
            dispatch(addNewReservationSuccess(response.data));
            return response.data; // Trả về dữ liệu đơn đặt chỗ
        } catch (error) {
            dispatch(addNewReservationFailure(error.message));
            throw new Error(error.message); // Ném lỗi để bắt trong component
        }
    };
};

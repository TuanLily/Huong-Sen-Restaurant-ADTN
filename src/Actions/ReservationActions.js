export const FETCH_RESERVATION_REQUEST = "FETCH_RESERVATION_REQUEST";
export const FETCH_RESERVATION_SUCCESS = "FETCH_RESERVATION_SUCCESS";
export const FETCH_RESERVATION_FAILURE = "FETCH_RESERVATION_FAILURE";

import { API_ENDPOINT, API_DATA } from "../Config/Client/APIs";
import http from "../Utils/Http";

// Action Creators
export const fetchReservationRequest = () => ({
    type: FETCH_RESERVATION_REQUEST,
});

export const fetchReservationSuccess = reservation => ({
    type: FETCH_RESERVATION_SUCCESS,
    payload: reservation,
});

export const fetchReservationFailure = error => ({
    type: FETCH_RESERVATION_FAILURE,
    payload: error,
});

// Thunk to Fetch Reservations
export const fetchReservations = () => {
    return async dispatch => {
        dispatch(fetchReservationRequest());
        try {
            const response = await http.get(`${API_ENDPOINT}${API_DATA.reservations}`);
            dispatch(fetchReservationSuccess(response.data));
        } catch (error) {
            dispatch(fetchReservationFailure(error.message));
        }
    };
};

// Thunk to Add a New Reservation
export const addNewReservation = (reservationData) => {
    return async (dispatch) => {
        dispatch(fetchReservationRequest());

        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.reservations}`, reservationData);
            dispatch(fetchReservationSuccess(response.data));
        } catch (error) {
            dispatch(fetchReservationFailure(error.message));
            throw new Error(error.message); // Ném lỗi để bắt trong component
        }
    };
};
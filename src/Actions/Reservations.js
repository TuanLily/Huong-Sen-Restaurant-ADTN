export const FETCH_RESERVATION_REQUEST = "FETCH_RESERVATION_REQUEST";
export const FETCH_RESERVATION_SUCCESS = "FETCH_RESERVATION_SUCCESS";
export const FETCH_RESERVATION_FAILURE = "FETCH_RESERVATION_FAILURE";

import { API_ENDPOINT, API_DATA } from "../Config/Client/APIs";
import http from "../Utils/Http";
import axios from 'axios';

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
    return dispatch => {
        dispatch(fetchReservationRequest());
        http.get(`${API_ENDPOINT}${API_DATA.reservations}`)
            .then(response => {
                dispatch(fetchReservationSuccess(response.data));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchReservationFailure(errorMsg));
            });
    };
};

// Thunk to Add a New Reservation
export const addNewReservation = (reservationData) => {
    return dispatch => {
        dispatch(fetchReservationRequest());
        http.post(`${API_ENDPOINT}${API_DATA.reservations}`, reservationData)
            .then(response => {
                dispatch(fetchReservationSuccess(response.data));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchReservationFailure(errorMsg));
            });
    };
};

// Thunk to Update a Reservation
export const updateReservation = (id, reservationData) => {
    return dispatch => {
        dispatch(fetchReservationRequest());
        http.put(`${API_ENDPOINT}${API_DATA.reservations}/${id}`, reservationData)
            .then(response => {
                dispatch(fetchReservationSuccess(response.data));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchReservationFailure(errorMsg));
            });
    };
};

// Thunk to Delete a Reservation
export const deleteReservation = (id) => {
    return dispatch => {
        dispatch(fetchReservationRequest());
        http.delete(`${API_ENDPOINT}${API_DATA.reservations}/${id}`)
            .then(response => {
                dispatch(fetchReservationSuccess(response.data));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchReservationFailure(errorMsg));
            });
    };
};

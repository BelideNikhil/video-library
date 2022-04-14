import { authActionTypes } from "./ActionTypes";

const { SET_LOGIN_ERROR, SET_SIGNUP_ERROR, SET_AUTH, SET_AUTH_LOGOUT } = authActionTypes;

export function authReducerFunction(authState, { type, payload }) {
    switch (type) {
        case SET_AUTH:
            return { userName: payload.userName, token: payload.token, loginError: "", signupError: "" };
        case SET_LOGIN_ERROR:
            return { userName: "", token: "", loginError: payload.error, signupError: "" };
        case SET_SIGNUP_ERROR:
            return { userName: "", token: "", loginError: "", signupError: payload.error };
        case SET_AUTH_LOGOUT:
            return { userName: "", token: "", loginError: "", signupError: "" };
        default:
            return authState;
    }
}

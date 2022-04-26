import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Context";
import { getLoginDetails, getSignupDetails } from "../Services";
import { authActionTypes } from "../Reducers/ActionTypes";

const { SET_LOGIN_ERROR, SET_SIGNUP_ERROR, SET_AUTH, SET_AUTH_LOGOUT } = authActionTypes;

export function useAuth() {
    const { authState, authDispatchFuntion } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/explore";

    const userLoginHandler = async (userData) => {
        const toastId = toast.loading("Logging In...");
        try {
            const { status, data } = await getLoginDetails(userData);
            if (status === 200) {
                toast.success(`Welcome back, ${data.foundUser.firstName} `, { id: toastId });
                authDispatchFuntion({
                    type: SET_AUTH,
                    payload: { userDetails: data.foundUser, token: data.encodedToken },
                });
                localStorage.setItem(
                    "offroad_tv_jwt",
                    JSON.stringify({ userDetails: data.foundUser, token: data.encodedToken })
                );
                navigate(from, { replace: true });
            }
        } catch (err) {
            toast.error("Login Error", { id: toastId });
            authDispatchFuntion({ type: SET_LOGIN_ERROR, payload: { error: err.response.data.errors[0] } });
        }
    };

    const userSignupHandler = async (newUserData) => {
        const toastId = toast.loading("Signing Up...");
        try {
            const { status, data } = await getSignupDetails(newUserData);
            console.log(data);

            if (status === 201) {
                toast.success(`Hello, ${data.createdUser.firstName} `, { id: toastId });
                authDispatchFuntion({
                    type: SET_AUTH,
                    payload: { userDetails: data.createdUser, token: data.encodedToken },
                });
                localStorage.setItem(
                    "offroad_tv_jwt",
                    JSON.stringify({ userDetails: data.createdUser, token: data.encodedToken })
                );
                navigate(from, { replace: true });
            }
        } catch (err) {
            toast.error("Sign Up Error", { id: toastId });
            authDispatchFuntion({ type: SET_SIGNUP_ERROR, payload: { error: err.response.data.errors[0] } });
        }
    };

    const userLogoutHandler = () => {
        toast.success(`Logged out`);
        authDispatchFuntion({ type: SET_AUTH_LOGOUT });
        localStorage.removeItem("offroad_tv_jwt");
        navigate("/");
    };

    return { authState, authDispatchFuntion, userLoginHandler, userSignupHandler, userLogoutHandler };
}

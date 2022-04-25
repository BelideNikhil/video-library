import { createContext, useReducer } from "react";

import { authReducerFunction } from "../Reducers";

export const AuthContext = createContext();

const local_data = JSON.parse(localStorage.getItem("offroad_tv_jwt"));
const initialAuthState = {
    userDetails: (local_data && local_data.userDetails) || "",
    token: (local_data && local_data.token) || "",
    loginError: "",
    signupError: "",
};

export function AuthProvider({ children }) {
    const [authState, authDispatchFuntion] = useReducer(authReducerFunction, initialAuthState);

    return <AuthContext.Provider value={{ authState, authDispatchFuntion }}>{children}</AuthContext.Provider>;
}

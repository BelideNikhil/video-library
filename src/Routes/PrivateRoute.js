import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Hooks";

export default function PrivateRoute() {
    const {
        authState: { token },
    } = useAuth();
    const location = useLocation();

    return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

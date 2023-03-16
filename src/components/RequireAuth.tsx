import { useLocation, Navigate } from "react-router-dom";

import { Home } from '../pages'

const RequireAuth = () => {
    const location = useLocation();
    return (
        localStorage.getItem("token") ? <Home /> : <Navigate to="/" state={{ from: location }} replace />
    )
}

export default RequireAuth
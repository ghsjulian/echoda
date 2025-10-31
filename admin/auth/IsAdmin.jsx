import React from "react";
import { Navigate } from "react-router-dom";
import useAdminStore from "../store/useAdmin";

const IsAdmin = ({ children }) => {
    const { admin } = useAdminStore();
    return (
        <>
            {admin && admin?.role === "ADMIN" ? (
                children
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default IsAdmin;

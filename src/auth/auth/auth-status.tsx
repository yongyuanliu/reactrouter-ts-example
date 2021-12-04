import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./auth-context";

export function AuthStatus() {
    let auth = useAuth();
    let navigate = useNavigate();
    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user}!{" "}
            <button
                onClick={() => {
                    auth.signout(() => navigate("/"));
                }}
            >
                Sign out
            </button>
        </p>
    );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}
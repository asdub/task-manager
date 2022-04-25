import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import formatHttpApiError from "src/helpers/formatHttpApiError";

import { AuthContext } from "src/context/AuthContextProvider";
import getCommonOptions from "src/helpers/axios/getCommonOptions";

export default function useRequestAuth() {
    const [loading, setLoading] = useState(false);
    const [logoutPending, setLogoutPending] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState(null);
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleReuqestError = useCallback((err) => {
        const formatedError = formatHttpApiError(err);
        setError(formatedError);
        enqueueSnackbar(formatedError);
        setLoading(false);
    }, [enqueueSnackbar, setLoading, setError])

    const requestPasswordReset = useCallback((email, successCallback) => {
        setLoading(true);
        axios.post("/api/auth/users/reset_password/", { email })
            .then(() => {
                setLoading(false);
                enqueueSnackbar(`Password reset link sent to ${email}`)
                if (successCallback) {
                    successCallback();
                }
            }).catch(handleReuqestError)
    }, [enqueueSnackbar, handleReuqestError])

    const resetPassword = useCallback((data, successCallback) => {
        setLoading(true);
        axios.post("/api/auth/users/reset_password_confirm/", data)
            .then(() => {
                enqueueSnackbar("Password successfully updated. Please login");
                setLoading(false);
                if (successCallback) {
                    successCallback();
                }
            }).catch(handleReuqestError)
    }, [enqueueSnackbar, handleReuqestError])

    const register = useCallback(({username, email, password}, successCallback ) => {
        setLoading(true);
        axios.post("/api/auth/users/", {
            username, 
            email, 
            password
        })
            .then(() => {
                enqueueSnackbar("Sign Up Successful. Please Login.");
                setLoading(false);
                if (successCallback) {
                    successCallback();
                }
            }).catch(handleReuqestError)
    }, [enqueueSnackbar, handleReuqestError, setLoading])

    const login = useCallback(({ username, password }) => {
        setLoading(true);
        axios.post("/api/auth/token/login/", { username, password })
            .then((res) => {
                const { auth_token } =res.data;
                localStorage.setItem("authToken", auth_token);
                setLoading(false)
                setIsAuthenticated(true);
            }).catch(handleReuqestError)
    }, [handleReuqestError, setLoading, setIsAuthenticated])

    const logout = useCallback(() => {
        setLogoutPending(true);
        axios.post("/api/auth/token/logout/", null, getCommonOptions())
            .then(() => {
                localStorage.removeItem("authToken");
                setLogoutPending(false);
                setIsAuthenticated(false);
            }).catch((err) => {
                setLogoutPending(false);
                handleReuqestError(err);
            })
    }, [handleReuqestError, setLogoutPending, setIsAuthenticated])

    return {
        register,
        login,
        logout,
        logoutPending,
        loading,
        error,
        requestPasswordReset,
        resetPassword
    }
}
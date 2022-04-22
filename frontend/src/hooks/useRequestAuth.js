import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import formatHttpApiError from "src/helpers/formatHttpApiError";

import { AuthContext } from "src/context/AuthContextProvider";

export default function useRequestAuth() {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState(null);
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleReuqestError = useCallback((err) => {
        const formatedError = formatHttpApiError(err);
        setError(formatedError);
        enqueueSnackbar(formatedError);
        setLoading(false);
    }, [enqueueSnackbar, setLoading, setError])

    const register = useCallback(({ username, email, password, successCallback }) => {
        setLoading(true);
        axios.post("/api/auth/users/", {
            username, 
            email, 
            password
        })
            .then(() => {
                enqueueSnackbar("Sign Up Successful.");
                setLoading(false);
                if (successCallback) {
                    successCallback();
                }
            }).catch(handleReuqestError)
    }, [enqueueSnackbar, handleReuqestError, setLoading])

    const login = useCallback(({ username, password }, successCallback) => {
        setLoading(true);
        axios.post("/api/auth/token/login/", { username, password })
            .then((res) => {
                const { auth_token } =res.data;
                localStorage.setItem("authToken", auth_token);
                setLoading(false)
                setIsAuthenticated(true);
                if (successCallback) {
                    successCallback();
                }
            }).catch(handleReuqestError)
    }, [handleReuqestError, setLoading, setIsAuthenticated])

    return {
        register,
        login,
        loading,
        error
    }
}
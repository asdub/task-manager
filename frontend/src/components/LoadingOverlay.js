import React, { useState, useMemo } from 'react'
import { Backdrop, Box, CircularProgress } from "@mui/material"
import PropTypes from "prop-types";

export const LoadingOverlayContext = React.createContext({
    setLoading: () => { }
})

export default function LoadingOverlay({ children }) {
    const [loading, setLoading] = useState(false);
    const overlayValue = useMemo(() => {
        return { setLoading }
    }, [setLoading])
    return (
        <LoadingOverlayContext.Provider value={overlayValue}>
            <Box sx={{
                position: "relative",
                display: "flex",
                width: "100%",
                height: "100vh"
            }}>
                <Backdrop sx={{
                    background: "rgba(0,0,0, 0.1)",
                    display: "flex",
                    width: "100%",
                    height: "100vh",
                    position: "absolute"
                }}
                    open={loading}>
                    <CircularProgress />
                </Backdrop>
                {children}
            </Box>
        </LoadingOverlayContext.Provider>
    )
}

LoadingOverlay.propTypes = {
    children: PropTypes.node
}
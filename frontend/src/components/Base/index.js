import React from "react";
import { Outlet } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import SideMenu from "./SideMenu";
import AppHeader from "./AppHeader";



import LoadingOverlay from "src/components/LoadingOverlay";

function BaseLayout() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <Box sx={{ display: "flex" }}>
            <AppHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <SideMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            <LoadingOverlay>
                <Box
                    sx={{
                        flexGrow: 1,
                        padding: (theme) => theme.spacing(3),
                    }}
                >
                    <Toolbar />
                    <Box>
                        <Outlet />
                    </Box>
                </Box>
            </LoadingOverlay>
        </Box>
    );
}

export default BaseLayout;

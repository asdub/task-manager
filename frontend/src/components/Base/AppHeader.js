import React from "react";
import PropTypes from "prop-types";
import {
    AppBar,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    TextField,
    Box,
    Modal,
    CircularProgress,
    useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AccountCircle,
    Brightness2Outlined,
    Brightness6Outlined
} from "@mui/icons-material";

import { AuthContext } from "src/context/AuthContextProvider"
import useRequestAuth from "src/hooks/useRequestAuth";
import { ThemeModeContext } from "src/context/ThemeModeProvider";
import { ReactComponent as Logo } from 'src/assets/svg/task_logo.svg';

const drawerWidth = 240;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const styles = {
    logo: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
};

export function AppHeader({ mobileOpen, setMobileOpen }) {
    const themeMode = React.useContext(ThemeModeContext);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const { user } = React.useContext(AuthContext);
    const { logout, logoutPending } = useRequestAuth();

    const handleLogout = () => {
        logout();
    }

    const handleOpenModal = () => {
        setModalIsOpen(true);
        setAnchorEl(null);
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const modal = (
        <Modal open={modalIsOpen} onClose={handleCloseModal}>
            <Box sx={modalStyle}>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        mb: 2
                    }}>
                    Account Details
                </Typography>
                <TextField
                    id="username"
                    variant="outlined"
                    label="Username"
                    value={user ? user.username : ""}
                    disabled
                    sx={{
                        mb: 2,
                        width: "100%"
                    }}
                />
                <TextField
                    id="email"
                    variant="outlined"
                    label="Email"
                    value={user ? user.email : ""}
                    disabled
                    sx={{
                        mb: 2,
                        width: "100%"
                    }}
                />
            </Box>
        </Modal>
    )

    const authLinks = (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 1 }} onClick={themeMode.toggleThemeMode}>
                {theme.palette.mode === "dark" ?
                    <Brightness6Outlined /> :
                    <Brightness2Outlined color="white" />}
            </IconButton>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleOpenModal}>Account Details</MenuItem>
                <MenuItem disabled={logoutPending} onClick={handleLogout}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        {logoutPending === true ? <CircularProgress size={15} sx={{ mr: 2 }} /> : null}
                    </Box>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );

    return (
        <AppBar
            position="fixed"
            xs={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
            }}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={styles.logo}>
                    <Logo className="Logo-sm" fill={theme.palette.white.main} />
                </Box>
                {authLinks}
            </Toolbar>
            {modal}
        </AppBar>
    );
}

AppHeader.propTypes = {
    mobileOpen: PropTypes.bool,
    setMobileOpen: PropTypes.func.isRequired,
};

export default AppHeader;

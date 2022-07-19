import React from "react";
import { Box, IconButton, Link, useTheme } from "@mui/material";
import { Brightness2Outlined, Brightness6Outlined } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeModeContext } from "src/context/ThemeModeProvider";
import { AuthContext } from "src/context/AuthContextProvider"

export default function Footer() {
    const themeMode = React.useContext(ThemeModeContext);
    const { isAuthenticated } = React.useContext(AuthContext);
    const theme = useTheme()

    const styles = {
        footer: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.secondary.main,
            p:  theme.spacing(1),
        },
        div: {
            display: 'flex',
            alignItems: 'center',
        },
    }

    return (
        <>
            <Box component="footer" sx={styles.footer}>
                <Box sx={styles.div}>
                    <GitHubIcon color="white" />
                    <Link
                        component="a"
                        variant="caption"
                        target="_blank" 
                        rel="noopener noreferrer"
                        href={process.env.REACT_APP_GITHUB_LINK}
                        key="github"
                        sx={{ 
                            p:1,
                            color: theme.palette.white.main,
                        }}
                    >
                        View on Github
                    </Link>
                </Box>
                { !isAuthenticated ? (
                    <IconButton sx={{ ml: 1 }} onClick={themeMode.toggleThemeMode}>
                    {theme.palette.mode === "dark" ?
                        <Brightness6Outlined /> :
                        <Brightness2Outlined color="white" />}
                    </IconButton>
                ) : ""
                }
            </Box>
        </>
    )
}

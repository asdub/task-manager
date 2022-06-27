import React from 'react';
import { Box, Link, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    const theme = useTheme()

    const styles = {
        footer: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: theme.palette.secondary.main,
            p:  theme.spacing(1),
        },
    }

    return (
        <>
            <Box component="footer" sx={styles.footer}>
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
        </>
    )
}

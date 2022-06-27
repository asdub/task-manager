import React from "react";
import PropTypes from "prop-types";

import { grey } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function StatCard({ loading, title, value, icon }) {
    return (
        <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper
                sx={{
                    p: (theme) => theme.spacing(1),
                    display: "flex",
                    alignItems: "center",
                }}
                elevation={4}
            >
                <Box>
                    <Avatar
                        sx={{
                            m: (theme) => theme.spacing(1),
                            backgroundColor: (theme) => theme.palette.secondary.main,
                            color: grey[100],
                            width: 32,
                            height: 32,
                        }}
                    >
                        {icon}
                    </Avatar>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                        variant="caption"
                        sx={{ ml: (theme) => theme.spacing(1) }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ ml: (theme) => theme.spacing(1) }}
                    >
                        {`${loading ? "Loading..." : value}`}
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
}

StatCard.propTypes = {
    loading: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.number,
    icon: PropTypes.node,
};

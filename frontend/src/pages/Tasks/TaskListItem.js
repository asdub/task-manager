import React, { useState } from 'react';
import PropTypes from "prop-types";
import { ListItemIcon, styled, Checkbox, Card, CardHeader, CardContent, IconButton, Box, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: "unset",
    ":hover": {
        color: theme.palette.primary.main
    }
}));

export default function TaskListItem({ task, handleConfirmDelete }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }


    return <Card elevation={3} sx={{ mb: 2 }}>
        <CardHeader sx={{
            pt: 1,
            pb: 1
        }}
            titleTypographyProps={{
                variant: "subtitle2"
            }}
            action={
                <Box>
                    <IconButton size="small" onClick={handleClick}>
                        <MoreVertIcon
                            fontSize="small"
                            id={`tasks-card-action-${task.id}`}
                            aria-controls={`tasks-card-menu-${task.id}`}
                            aria-expanded={`task-card-menu-true-${task.id}`}
                        />
                    </IconButton>
                    <Menu
                        id={`tasks-card-action-menu-${task.id}`}
                        aria-labelledby={`task-card-action-${task.id}`}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                    >
                        <MenuItem onClick={() => {
                            handleConfirmDelete(task.id);
                        }}>
                            <ListItemIcon>
                                <DeleteOutlineIcon fontSize="small" />
                                Delete
                            </ListItemIcon>
                        </MenuItem>
                    </Menu>
                </Box>
            }
            title={
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Checkbox
                        sx={{ padding: (theme) => `0 ${theme.spacing(0.5)} 0 0` }}
                        checked={task.completed || false}
                        onClick={null}
                    />
                    <StyledLink to={`/tasks/edit/${task.id}`} key={"tasks-edit"}>
                        {task.title}
                    </StyledLink>
                </Box>
            }
        />
        <CardContent sx={{ pt: 0.25, pb: 0.25 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>

                {task.category_name}

            </Box>
        </CardContent>
    </Card>;
}

TaskListItem.propTypes = {
    task: PropTypes.shape({
        completed: PropTypes.bool,
        title: PropTypes.string,
        category_name: PropTypes.string,
        category_color: PropTypes.string,
        id: PropTypes.number,
        description: PropTypes.string,
        priority: PropTypes.number,
    }),
    handleConfirmDelete: PropTypes.func
};
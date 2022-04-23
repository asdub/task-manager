import React, { useEffect, useState } from 'react'
import {
  Box, Button, Dialog, DialogActions, DialogTitle,
  Typography, Pagination
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Masonry from "react-masonry-css";

import TaskListItem from "./TaskListItem";
import useRequestResource from 'src/hooks/useRequestResource';
import Filters from "./Filters";

const pageSize = 6;
const breakpoints = {
  default: 4, 1400: 3, 1100: 2, 700: 1
}

export default function Tasks() {
  const { resourceList, getResourceList, deleteResource, updateResource } =
    useRequestResource({ endpoint: "tasks", resourceLabel: "Task" })
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search);


  const handleUpdateCompleted = (task) => {
    updateResource(task.id, {
      completed: !task.completed
    })
  }

  const handleConfirmDelete = (id) => {
    setIdToDelete(id);
    setOpen(true);
  }

  const handleDeleteClose = () => {
    setOpen(false);
  }

  const handleDelete = () => {
    setOpen(false);
    deleteResource(idToDelete);
  }

  const handlePagePagination = (event, value) => {
    const newQuery = {
      ...query,
      page: value
    }
    const newSearch = queryString.stringify(newQuery);
    navigate(`${location.pathname}?${newSearch}`)
  }

  const onSubmitSearch = (values) => {
    const { completed, priority, search, category } = values;
    const newQuery = {
      completed: completed === "True" || completed === "False"
        ? completed : undefined,
      priority: priority === "all" ? undefined : priority,
      category: category === "all" ? undefined : category,
      search: search
    }
    const newSearch = queryString.stringify(newQuery);
    navigate(`${location.pathname}?${newSearch}`)
  }

  useEffect(() => {
    getResourceList({ query: location.search });
  }, [getResourceList, location.search])

  return (
    <div>
      <Dialog open={open} onClose={handleDeleteClose}>
        <DialogTitle>
          Do you wish to delete this task?
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleDeleteClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Filters onSubmit={onSubmitSearch} />
      <Typography
        variant="subtitle1"
        color="text.primary"
        sx={{
          marginLeft: (theme) => theme.spacing(1),
          marginBottom: (theme) => theme.spacing(2),
        }}>
        {`You have ${resourceList.count || 0} tasks`}
      </Typography>
      <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 2,
        mb: 2
      }}>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/tasks/create"
        >
          Create Task
        </Button>
      </Box>
      <Masonry
        breakpointCols={breakpoints}
        className="task-masonry-grid"
        columnClassName="task-masonry-grid_column"
      >
        {resourceList.results.map((task) => {
          return (
            <div key={task.id}>
              <TaskListItem
                task={task}
                handleConfirmDelete={handleConfirmDelete}
                handleUpdateCompleted={handleUpdateCompleted}
              />
            </div>
          )
        })}
      </Masonry>

      <Box sx={{
        display: "flex",
        justifyContent: "flex-end"
      }}>
        <Pagination
          color="primary"
          page={query.page ? parseInt(query.page) : 1}
          onChange={handlePagePagination}
          count={Math.ceil(resourceList.count / pageSize) || 0}
        />
      </Box>
    </div>
  )
}

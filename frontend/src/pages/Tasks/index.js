import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";

import TaskListItem from "./TaskListItem";
import useRequestResource from 'src/hooks/useRequestResource';

export default function Tasks() {
  const { resourceList, getResourceList, deleteResource } = 
  useRequestResource({ endpoint: "tasks", resourceLabel: "Task" })
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

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

  useEffect(() => {
    getResourceList();
  }, [getResourceList])

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

      {resourceList.results.map((task) => {
        return (
          <div key={task.id}>
            <TaskListItem 
              task={task} 
              handleConfirmDelete={handleConfirmDelete}
            />
          </div>
        )
      })}
    </div>
  )
}

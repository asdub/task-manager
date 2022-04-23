import React, { useEffect } from 'react'
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

import TaskListItem from "./TaskListItem";
import useRequestResource from 'src/hooks/useRequestResource';

export default function Tasks() {
  const { resourceList, getResourceList } = 
  useRequestResource({ endpoint: "tasks"})

  useEffect(() => {
    getResourceList();
  }, [getResourceList])

  return (
    <div>
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
            <TaskListItem task={task} />
          </div>
        )
      })}
    </div>
  )
}

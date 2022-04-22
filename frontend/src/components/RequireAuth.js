import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { Grid } from "@mui/material"

import { AuthContext } from 'src/context/AuthContextProvider';

export default function RequireAuth() {
    const { isAuthenticated } = React.useContext(AuthContext);

    if (isAuthenticated === null) {
      return <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}>
          <div>Loading...</div>
      </Grid>
  }

    if (isAuthenticated === true) {
        return <Outlet />
    }

  return (
    <Navigate to="/signin" />
  )
}

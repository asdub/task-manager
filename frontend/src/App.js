import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";

import Categories from "./pages/Categories";
import CategoryDetails from "./pages/Categories/CategoryDetails";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import AuthContextProvider from "./context/AuthContextProvider";
import RequireAuth from "./components/RequireAuth";
import RequireNoAuth from "./components/RequireNoAuth";

import Base from "./components/Base";
import "./index.css";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/Tasks/TaskDetails";
import Dashboard from "./pages/Dashboard";
import RequestPasswordReset from "./pages/Auth/RequestPasswordReset";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm";

export default function App() {
  return <div>
    <CssBaseline />
      <AuthContextProvider>
        <SnackbarProvider>
          <Router>
            <Box sx={{
              bgcolor: (theme) => theme.palette.background.default,
              minHeight: "100vh",
              width: "100%"
            }}>
              <Routes>
                <Route element={<RequireAuth />}>
                  <Route element={<Base />}>
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/create" element={<CategoryDetails />} />
                    <Route path={`/categories/edit/:id`} element={<CategoryDetails />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/tasks/create" element={<TaskDetails />} />
                    <Route path={`/tasks/edit/:id`} element={<TaskDetails />} />
                    <Route path="/" element={<Dashboard />} />
                  </Route>
                </Route>
                <Route element={<RequireNoAuth />}>
                  <Route path={`/signup`} element={<SignUp />} />
                  <Route path={`/signin`} element={<SignIn />} />
                  <Route path={`/password-reset`} element={<RequestPasswordReset />} />
                  <Route path={`/auth/password-reset/confirm/:uid/:token`} element={<ResetPasswordConfirm />} />
                </Route>
              </Routes>
            </Box>
          </Router>
        </SnackbarProvider>
      </AuthContextProvider>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

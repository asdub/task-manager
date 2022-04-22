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
                  </Route>
                </Route>
                <Route element={<RequireNoAuth />}>
                  <Route path={`/signup`} element={<SignUp />} />
                  <Route path={`/signin`} element={<SignIn />} />
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

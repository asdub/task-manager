import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";

import Categories from "./pages/Categories";
import CategoryDetails from "./pages/Categories/CategoryDetails";
import LoadingOverlay from "./components/LoadingOverlay";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";

export default function App() {
  return <div>
    
    <CssBaseline />
    <LoadingOverlay>
      <SnackbarProvider>
        <Router>
          <Box sx={{
            bgcolor: (theme) => theme.palette.background.default,
            minHeight: "100vh",
            width: "100%"
          }}>
            <Routes>
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/create" element={<CategoryDetails />} />
              <Route path={`/categories/edit/:id`} element={<CategoryDetails />} />
              <Route path={`/auth/signup`} element={<SignUp />} />
              <Route path={`/auth/signin`} element={<SignIn />} />
            </Routes>
          </Box>
        </Router>
      </SnackbarProvider>
    </LoadingOverlay>
    </div>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/Categories/CategoryDetails";

export default function App() {
  return <div>
    
    <CssBaseline />
    <Router>
      <Box sx={{
        bgcolor: (theme) => theme.
        palette.background.default,
        minHeight: "100vh"
      }}>
        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/create" element={<CategoryDetails />} />
          <Route path={`/categories/edit/:id`} element={<CategoryDetails />} />
        </Routes>
      </Box>
    </Router>
    </div>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

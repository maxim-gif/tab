import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Main } from "./page/main/main";
import { Admin } from "./page/admin/admin";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

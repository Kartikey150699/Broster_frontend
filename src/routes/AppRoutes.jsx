import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* -----------------------------------------
   Page Imports
------------------------------------------*/
import AdminList from "../pages/admin/AdminList";

/* -----------------------------------------
   Application Routes
------------------------------------------*/
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------------------------
             ADMIN ROUTES
        ----------------------------*/}
        <Route path="/admin/list" element={<AdminList />} />

        {/* ---------------------------
             DEFAULT REDIRECT
             (any unknown URL → /admin/list)
        ----------------------------*/}
        <Route path="*" element={<Navigate to="/admin/list" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
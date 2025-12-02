import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ========================================================
//   Page Imports
// ========================================================
import AdminList from "../pages/admin/AdminList";
import AdminEdit from "../pages/admin/AdminEdit";
import AdminCreate from "../pages/admin/AdminCreate";

// ========================================================
//   Application Routes
// ========================================================
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ADMIN LIST */}
        <Route path="/admin/list" element={<AdminList />} />

        {/* ADMIN CREATE */}
        <Route path="/admin/create" element={<AdminCreate />} />

        {/* ADMIN EDIT */}
        <Route path="/admin/edit/:companyId/:adminId" element={<AdminEdit />} />

        {/* DEFAULT REDIRECT */}
        <Route path="*" element={<Navigate to="/admin/list" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
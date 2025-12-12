import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ========================================================
//   Page Imports
// ========================================================
import AdminList from "../pages/admin/AdminList";
import AdminEdit from "../pages/admin/AdminEdit";
import AdminCreate from "../pages/admin/AdminCreate";
import ApplyGroupList from "../pages/apply/ApplyGroupList";
import ApplyGroupCreate from "../pages/apply/ApplyGroupCreate";
import ApplyGroupEdit from "../pages/apply/ApplyGroupEdit";
import GroupList from "../pages/group/GroupList";
import GroupCreate from "../pages/group/GroupCreate";
import GroupEdit from "../pages/group/GroupEdit";
import CompanyCreate from "../pages/company/CompanyCreate";
import EmployeeList from "../pages/employee/EmployeeList";
import EmployeeCreate from "../pages/employee/EmployeeCreate";
import EmployeeEdit from "../pages/employee/EmployeeEdit";
import ShiftList from "../pages/shift/ShiftList";
import ShiftCreate from "../pages/shift/ShiftCreate";
import ShiftEdit from "../pages/shift/ShiftEdit";
import TemplateList from "../pages/template/TemplateList";


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

        {/* APPLY GROUP LIST */}
        <Route path="/apply-group/list" element={<ApplyGroupList />} />

        {/* APPLY GROUP CREATE */}
        <Route path="/apply-group/create" element={<ApplyGroupCreate />} />

        {/* APPLY GROUP EDIT */}
        <Route path="/apply-group/edit/:applyGroupId" element={<ApplyGroupEdit />} />

        {/* GROUP LIST */}
        <Route path="/group/list" element={<GroupList />} />

        {/* GROUP CREATE */}
        <Route path="/group/create" element={<GroupCreate />} />

        {/* GROUP EDIT */}
        <Route path="/group/edit/:companyId/:groupId" element={<GroupEdit />} />

        {/* COMPANY CREATE */}
        <Route path="/company/create" element={<CompanyCreate />} />

        {/* COMPANY EDIT */}
        <Route path="/company/edit" element={<CompanyCreate />} />

        {/* EMPLOYEE LIST */}
        <Route path="/employee/list" element={<EmployeeList />} />

        {/* EMPLOYEE CREATE */}
        <Route path="/employee/create" element={<EmployeeCreate />} />

        {/* EMPLOYEE EDIT */}
        <Route path="/employee/edit/:companyId/:groupId/:employeeId" element={<EmployeeEdit />}/>

        {/* SHIFT LIST */}
        <Route path="/shift/list" element={<ShiftList />} />

        {/* SHIFT CREATE */}
        <Route path="/shift/create" element={<ShiftCreate />} />

        {/* SHIFT EDIT */}
        <Route path="/shift/edit/:shiftId" element={<ShiftEdit />} />

        {/* TEMPLATE LIST */}
        <Route path="/template/list" element={<TemplateList />} />

        {/* DEFAULT REDIRECT */}
        <Route path="*" element={<Navigate to="/admin/list" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
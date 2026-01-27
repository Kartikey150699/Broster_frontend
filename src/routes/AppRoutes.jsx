import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ========================================================
//   Page Imports
// ========================================================
import AdminLogin from "../pages/auth/AdminLogin";
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
import TemplateCreate from "../pages/template/TemplateCreate";
import TemplateEdit from "../pages/template/TemplateEdit";
import PaidLeaveList from "../pages/paidleave/PaidLeaveList";
import PaidLeaveEdit from "../pages/paidleave/PaidLeaveEdit";
import ApplyList from "../pages/apply/ApplyList";
import ApplyCreate from "../pages/apply/ApplyCreate";
import ApplyEdit from "../pages/apply/ApplyEdit";
import StatusList from "../pages/status/StatusList";
import AttendanceBookOutputSearch from "../pages/print/AttendanceBookOutputSearch";
import AttendanceBookOutputShow from "../pages/print/AttendanceBookOutputShow";
import SummaryAttendance from "../pages/summary/SummaryAttendance";
import WorkPlanList from "../pages/plan/WorkPlanList";
import WorkPlanView from "../pages/plan/WorkPlanView";
import WorkPlanEdit from "../pages/plan/WorkPlanEdit";
import WorkResultList from "../pages/workResult/WorkResultList";
import WorkResultView from "../pages/workResult/WorkResultView";
import WorkResultEdit from "../pages/workResult/WorkResultEdit";
import SystemError from "../pages/error/SystemError";
import NotFound from "../pages/error/NotFound";
import PasswordChange from "../pages/admin/PasswordChange";
import EmployeeLogin from "../pages/auth/EmployeeLogin";
import StampShow from "../pages/stamp/StampShow";
import ApplyRequest from "../pages/apply/ApplyRequest";

// ========================================================
//   Application Routes
// ========================================================
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ADMIN LOGIN */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN LIST */}
        <Route path="/admin/list" element={<AdminList />} />

        {/* ADMIN CREATE */}
        <Route path="/admin/create" element={<AdminCreate />} />

        {/* ADMIN EDIT */}
        <Route path="/admin/edit/:companyId/:adminId" element={<AdminEdit />} />

        {/* PASSWORD CHANGE */}
        <Route path="/admin/password-change" element={<PasswordChange />} />

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

        {/* EMPLOYEE LOGIN */}
        <Route path="/employee/login" element={<EmployeeLogin />} />

        {/* SHIFT LIST */}
        <Route path="/shift/list" element={<ShiftList />} />

        {/* SHIFT CREATE */}
        <Route path="/shift/create" element={<ShiftCreate />} />

        {/* SHIFT EDIT */}
        <Route path="/shift/edit/:shiftId" element={<ShiftEdit />} />

        {/* TEMPLATE LIST */}
        <Route path="/template/list" element={<TemplateList />} />

        {/* TEMPLATE CREATE */}
        <Route path="/template/create" element={<TemplateCreate />} />

        {/* TEMPLATE EDIT */}
        <Route path="/template/edit/:templateId" element={<TemplateEdit />} />

        {/* PAID LEAVE LIST */}
        <Route path="/paid/list" element={<PaidLeaveList />} />

        {/* PAID LEAVE EDIT */}
        <Route path="/paid/edit/:companyId/:employeeId/:targetYear" element={<PaidLeaveEdit />} />

        {/* APPLY LIST */}
        <Route path="/apply/list" element={<ApplyList />} />

        {/* APPLY CREATE */}
        <Route path="/apply/create" element={<ApplyCreate />} />

        {/* APPLY EDIT */}
        <Route path="/apply/edit/:requestId" element={<ApplyEdit />} />

        {/* APPLY REQUEST */}
        <Route path="/stamp/applyRequest/:companyId/:groupId/:employeeId" element={<ApplyRequest />} />

        {/* STATUS LIST */}
        <Route path="/status/list" element={<StatusList />} />

        {/* PRINT SEARCH */}
        <Route path="/print/search" element={<AttendanceBookOutputSearch />} />

        {/* PRINT SHOW */}
        <Route path="/print/show" element={<AttendanceBookOutputShow />} />

        {/* SUMMARY ATTENDANCE */}
        <Route path="/summary/show" element={<SummaryAttendance />} />

        {/* STAMP SHOW */}
        <Route path="/employee/stamp/show" element={<StampShow />} />

        {/* WORK PLAN LIST */}
        <Route path="/workPlan/list" element={<WorkPlanList />} />

        {/* WORK PLAN VIEW */}
        <Route path="/workPlan/view/:month/:companyId/:groupId/:employeeId" element={<WorkPlanView />} />

        {/* WORK PLAN EDIT */}
        <Route path="/workPlan/edit/:month/:companyId/:groupId/:employeeId" element={<WorkPlanEdit />} />

        {/* WORK RESULT LIST */}
        <Route path="/result/list" element={<WorkResultList />} />

        {/* WORK RESULT VIEW */}
        <Route path="/result/view/:month/:companyId/:groupId/:employeeId" element={<WorkResultView />} />

        {/* WORK RESULT EDIT */}
        <Route path="/result/edit/:month/:companyId/:groupId/:employeeId" element={<WorkResultEdit />} />

        {/* SYSTEM ERROR */}
        <Route path="/error/system" element={<SystemError />} />

        {/* 404 NOT FOUND */}
        <Route path="/error/404" element={<NotFound />} />

        {/* DEFAULT REDIRECT */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
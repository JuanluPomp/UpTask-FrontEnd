import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import DashboardView from "@/views/DashboardView"
import CreateprojectView from "./views/projects/CreateprojectView"
import EditProjectView from "./views/projects/EditProjectView"
import ProjectDetailView from "./views/projects/ProjectDetailView"
import AuthLayout from "./layouts/AuthLayout"
import LoginView from "./views/auth/LoginView"

export default function Router() {
  return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<DashboardView/>} index/>
                    <Route path="/projects/create" element={<CreateprojectView/>} />
                    <Route path="/projects/:projectId" element={<ProjectDetailView/>} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView/>} />
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path={'/auth'} element={<LoginView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
  )
}

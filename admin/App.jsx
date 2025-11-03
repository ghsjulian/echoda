import React, { useEffect, lazy, Suspense } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import AdminLayouts from "./layouts/AdminLayouts";
import useAdminStore from "./store/useAdmin";
import useApi from "./store/useApi";

// ✅ Lazy load all admin pages for better performance
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const EditHome = lazy(() => import("./pages/EditHome"));
const EditAbout = lazy(() => import("./pages/EditAbout"));
const AddTeam = lazy(() => import("./pages/AddTeam"));
const EditTeamMember = lazy(() => import("./pages/EditTeamMember"));
const ViewTeamMembers = lazy(() => import("./pages/ViewTeamMembers"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const ViewBlogs = lazy(() => import("./pages/ViewBlogs"));
const EditBlog = lazy(() => import("./pages/EditBlog"));
const CampaignFlyer = lazy(() => import("./pages/CampaignFlyer"));
const CampaignFlyerList = lazy(() => import("./pages/CampaignFlyerList"));
const EditFlyer = lazy(() => import("./pages/EditFlyer"));

const App = () => {
    const { admin, isAuth } = useAdminStore();
    const {
        getSettings,
        getBlogs,
        getFlyers,
        isFetchingBlogs,
        isgettingSettings
    } = useApi();

    // ✅ Safe and clean initialization
    useEffect(() => {
        isAuth();
        if (!isgettingSettings && !isFetchingBlogs) {
            getSettings();
            getBlogs();
            getFlyers();
        }
    }, []); // only once on mount

    // ✅ Helper: Protected Route Wrapper
    const PrivateRoute = ({ children }) => {
        if (!admin || admin?.role !== "ADMIN") {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    return (
        <Router>
            {/* ✅ Suspense for lazy-loaded components */}
            <Suspense fallback={<div>Loading Admin Panel...</div>}>
                <Routes>
                    {/* ✅ Protected routes for logged-in admins */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <AdminLayouts />
                            </PrivateRoute>
                        }
                    >
                        <Route element={<Dashboard />} />
                        <Route index={true} path="dashboard" element={<Dashboard />} />
                        <Route path="edit-home" element={<EditHome />} />
                        <Route path="edit-about" element={<EditAbout />} />
                        <Route path="add-team" element={<AddTeam />} />
                        <Route
                            path="edit-member/:name"
                            element={<EditTeamMember />}
                        />
                        <Route
                            path="view-team-members"
                            element={<ViewTeamMembers />}
                        />
                        <Route path="create-blog" element={<CreateBlog />} />
                        <Route path="view-blogs" element={<ViewBlogs />} />
                        <Route path="edit-blog/:id" element={<EditBlog />} />
                        <Route path="create-flyer" element={<CampaignFlyer />} />
                        <Route path="get-flyer-list" element={<CampaignFlyerList />} />
                        <Route path="edit-flyer/:id" element={<EditFlyer />} />
                    </Route>

                    {/* ✅ Admin login route */}
                    <Route
                        path="/login"
                        element={
                            admin && admin?.role === "ADMIN" ? (
                                <Navigate to="/dashboard" replace />
                            ) : (
                                <AdminLogin />
                            )
                        }
                    />

                    {/* ✅ 404 route for unknown paths */}
                    <Route
                        path="*"
                        element={
                            <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                                404 - Page Not Found
                            </h1>
                        }
                    />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;

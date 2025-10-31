import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import AdminLayouts from "./layouts/AdminLayouts";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import EditHome from "./pages/EditHome";
import EditAbout from "./pages/EditAbout";
import AddTeam from "./pages/AddTeam";
import EditTeamMember from "./pages/EditTeamMember";
import ViewTeamMembers from "./pages/ViewTeamMembers";
import CreateBlog from "./pages/CreateBlog";
import ViewBlogs from "./pages/ViewBlogs";
import EditBlog from "./pages/EditBlog";
import CampaignFlyer from "./pages/CampaignFlyer";
import CampaignFlyerList from "./pages/CampaignFlyerList";
import EditFlyer from "./pages/EditFlyer";

import useAdminStore from "./store/useAdmin";
import useApi from "./store/useApi";

const App = () => {
    const { admin, isAuth } = useAdminStore();
    const { getSettings, getBlogs,getFlyers, isFetchingBlogs, isgettingSettings } =
        useApi();
    useEffect(() => {
        isAuth();
        getSettings();
        getBlogs();
        getFlyers()
        if (isgettingSettings && isFetchingBlogs) return;
        if(!admin) return 
    }, [getSettings]);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<AdminLayouts />}>
                    <Route index path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/edit-home" element={<EditHome />} />
                    <Route path="/edit-about" element={<EditAbout />} />
                    <Route path="/add-team" element={<AddTeam />} />
                    <Route
                        path="/edit-member/:name"
                        element={<EditTeamMember />}
                    />
                    <Route
                        path="/view-team-members"
                        element={<ViewTeamMembers />}
                    />
                    <Route path="/create-blog" element={<CreateBlog />} />
                    <Route path="/view-blogs" element={<ViewBlogs />} />
                    <Route path="/edit-blog/:id" element={<EditBlog />} />
                    <Route path="/create-flyer" element={<CampaignFlyer />} />
                    <Route path="/get-flyer-list" element={<CampaignFlyerList />} />
                    <Route path="/edit-flyer/:id" element={<EditFlyer />} />
                </Route>
                <Route
                    path="/login"
                    element={
                        !admin && admin?.role !== "ADMIN" ? (
                            <AdminLogin />
                        ) : (
                            <Navigate to="/dashboard" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;

import { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CouncilWards from "./pages/CouncilWards";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Import Auth Here...
import useAuth from "./store/useAuth";
import useApp from "./store/useApp";

const App = () => {
    const { isLoggedin } = useAuth();
    const { isBlogging, getBlogs,getFlyers,getSettings, settings, isgettingSettings } = useApp();
    useEffect(() => {
        getSettings();
        getBlogs()
        getFlyers()
        if (isgettingSettings && isBlogging) return;
    }, [getSettings,getBlogs,getFlyers]);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Layouts />}>
                    <Route index path="/" element={<Home />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/council-wards" element={<CouncilWards />} />
                </Route>
                <Route
                    path="/login"
                    element={isLoggedin() ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={isLoggedin() ? <Navigate to="/" /> : <Signup />}
                />
            </Routes>
        </Router>
    );
};

export default App;

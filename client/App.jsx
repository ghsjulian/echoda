import { useEffect, lazy, Suspense } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Layouts from "./layouts/Layouts";
import useAuth from "./store/useAuth";
import useApp from "./store/useApp";

// ✅ Lazy load all pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const CouncilWards = lazy(() => import("./pages/CouncilWards"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

const App = () => {
    const { isLoggedin } = useAuth();
    const {
        getBlogs,
        getFlyers,
        getSettings,
        isgettingSettings,
        isBlogging
    } = useApp();

    // Fetch settings/blogs/flyers once on mount
    useEffect(() => {
        if (!isgettingSettings && !isBlogging) {
            getSettings();
            getBlogs();
            getFlyers();
        }
    }, []); // runs once on component mount

    return (
        <Router>
            {/* ✅ Fallback loader while components are lazy-loaded */}
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Layouts />}>
                        <Route index={true} element={<Home />} />
                        <Route path="blogs" element={<Blogs />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="about" element={<About />} />
                        <Route path="council-wards" element={<CouncilWards />} />
                    </Route>

                    {/* ✅ Auth routes */}
                    <Route
                        path="/login"
                        element={isLoggedin() ? <Navigate to="/" /> : <Login />}
                    />
                    <Route
                        path="/signup"
                        element={isLoggedin() ? <Navigate to="/" /> : <Signup />}
                    />

                    {/* ✅ Catch-all route for 404 */}
                    <Route
                        path="*"
                        element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h1>}
                    />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;

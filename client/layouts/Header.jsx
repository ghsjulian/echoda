import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const [path, setPath] = useState("");
    useEffect(() => {
        setPath(location.pathname);
    }, [location]);

    return (
        <header>
            <div className="header-logo">
                <h1>echoda jnr</h1>
            </div>
            <div className="links">
                <NavLink className={path==="/home"?"active":""} to="/">Home</NavLink>
                <NavLink className={path==="/about"?"active":""} to="/about">About</NavLink>
                <NavLink className={path==="/contact"?"active":""} to="/contact">Contact</NavLink>
                <NavLink className={path==="/blogs"?"active":""} to="/blogs">Blogs</NavLink>
                <NavLink className={path==="/council-wards"?"active":""} to="/council-wards">Council</NavLink>
            </div>
        </header>
    );
};

export default Header;

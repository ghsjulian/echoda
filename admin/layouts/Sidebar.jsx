import React, { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { HiOutlineCollection } from "react-icons/hi";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoBagAddOutline } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { FaBorderNone } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineWhatsapp } from "react-icons/md";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { BsBoxArrowInRight } from "react-icons/bs";
import useAdmin from "../store/useAdmin";

const Sidebar = () => {
    const { logout } = useAdmin();
    const inputRef = useRef(null);
    const location = useLocation();
    const [path, setPath] = useState("");
    const closeMenu = () => {
        inputRef.current.checked = false;
    };
    useEffect(() => {
        setPath(location.pathname);
    }, [location]);

    return (
        <>
            <input ref={inputRef} type="checkbox" id="menu-toggle" />
            <nav className="sidebar">
                <ul>
                    <li>
                        <NavLink
                            className={path === "dashboard" ? "active" : ""}
                            onClick={closeMenu}
                            to="dashboard"
                        >
                            <MdOutlineDashboardCustomize size={22} /> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={path === "edit-about" ? "active" : ""}
                            onClick={closeMenu}
                            to="edit-about"
                        >
                            <IoBagAddOutline size={22} /> Edit About Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={path === "edit-home" ? "active" : ""}
                            onClick={closeMenu}
                            to="edit-home"
                        >
                            <IoBagAddOutline size={22} />
                            Edit Home Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={path === "view-orders" ? "active" : ""}
                            onClick={closeMenu}
                            to="add-team"
                        >
                            <BsHandbag size={22} />
                            Create Team Member
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={path === "create-blog" ? "active" : ""}
                            onClick={closeMenu}
                            to="create-blog"
                        >
                            <BsHandbag size={22} />
                            Create New Blog
                        </NavLink>
                    </li>
                     <li>
                        <NavLink
                            className={path === "create-flyer" ? "active" : ""}
                            onClick={closeMenu}
                            to="create-flyer"
                        >
                            <BsHandbag size={22} />
                            Create Campaign Flyers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={path === "get-flyer-list" ? "active" : ""}
                            onClick={closeMenu}
                            to="get-flyer-list"
                        >
                            <BsHandbag size={22} />
                            All Campaign Flyers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={
                                path === "view-team-members" ? "active" : ""
                            }
                            onClick={closeMenu}
                            to="view-team-members"
                        >
                            <HiOutlineCollection size={22} />
                            View Team Members
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={
                                path === "view-blogs" ? "active" : ""
                            }
                            onClick={closeMenu}
                            to="view-blogs"
                        >
                            <MdOutlineCategory size={22} /> View all blogs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={
                                path === "view-analytics" ? "active" : ""
                            }
                            onClick={closeMenu}
                            to="view-analytics"
                        >
                            <LuChartNoAxesCombined size={22} /> View Analytics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={path === "settings" ? "active" : ""}
                            onClick={closeMenu}
                            to="settings"
                        >
                            <GoGear size={22} />
                            Settings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={path === "/admin/logout" ? "active" : ""}
                            onClick={e => {
                                e.preventDefault();
                                closeMenu();
                                logout();
                            }}
                            to="/logout"
                        >
                            <BsBoxArrowInRight size={22} />
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;

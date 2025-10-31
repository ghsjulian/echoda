import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import "../styles/app.layout.css"
import Header from "./Header";
import Footer from "./Footer";

const Layouts = () => {
    return (
        <>
            <Header />
            <main>
            <Outlet/>
            </main>
            <Footer />
        </>
    );
};

export default Layouts;

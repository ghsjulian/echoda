import React from "react";
import { NavLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <div className="manifesto-card">
            <h4>{blog?.blogTitle}</h4>
            <img src={blog?.blogImage?.url} />
            <p>{blog?.blogContent.slice(0, 150)}</p>
            <NavLink to="#" className="download-btn">
                Continue Reading
            </NavLink>
        </div>
    );
};

export default BlogCard;

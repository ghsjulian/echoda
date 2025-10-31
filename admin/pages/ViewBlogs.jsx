import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useApi from "../store/useApi";

const ViewTeamMembers = () => {
    const { blogs, getBlogs, deleteBlog } = useApi();
    useEffect(() => {
        getBlogs();
    }, [ getBlogs]);
    return (
        <section className="products-container">
            <h2>All Total Blogs</h2>
            {blogs?.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thumbnail</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.map((blog, index) => {
                            return (
                                <tr id={"ghs-" + (index + 1)} key={index}>
                                    <td id="product-id">{index + 1}</td>
                                    <td>
                                        <img
                                            src={blog?.blogImage?.url}
                                            alt="Blog Image"
                                        />
                                    </td>
                                    <td>{blog?.blogTitle.slice(0, 70)}</td>
                                    <td className="action-buttons">
                                        <NavLink to={`/edit-blog/${blog?._id}`}>
                                            Edit
                                        </NavLink>
                                        <NavLink
                                            onClick={async e => {
                                                e.preventDefault();
                                                e.target.textContent =
                                                    "Processing...";
                                                await deleteBlog(
                                                    blog?._id,
                                                    e.target.parentElement
                                                        .parentElement
                                                );
                                                e.target.textContent =
                                                    "Deleted";
                                            }}
                                            to="#"
                                        >
                                            Delete
                                        </NavLink>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default ViewTeamMembers;

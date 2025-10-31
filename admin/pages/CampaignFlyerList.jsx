import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useApi from "../store/useApi";

const CampaignFlyerList = () => {
    const { flyers, deleteFlyer,isDeleting } = useApi();

    return (
        <section className="products-container">
            <h2>All Total Campaign Flyers</h2>
            {flyers?.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Downloads</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flyers?.map((flyer, index) => {
                            return (
                                <tr id={"ghs-" + (index + 1)} key={index}>
                                    <td id="product-id">{index + 1}</td>
                                    <td>
                                        <img
                                            src="/images/flyer.png"
                                            alt="Flyer Image"
                                        />
                                    </td>
                                    <td>{flyer?.title}</td>
                                    <td>{flyer?.downloads?.length}</td>
                                    <td className="action-buttons">
                                        <NavLink
                                            to={`/edit-flyer/${flyer?._id}`}
                                        >
                                            Edit
                                        </NavLink>
                                        <NavLink
                                            onClick={async e => {
                                                e.preventDefault();
                                                e.target.textContent =
                                                    "Processing...";
                                                await deleteFlyer(
                                                    flyer?._id,
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

export default CampaignFlyerList;

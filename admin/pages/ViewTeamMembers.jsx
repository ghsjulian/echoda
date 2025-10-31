import React from "react";
import { NavLink } from "react-router-dom";
import useApi from "../store/useApi";

const ViewTeamMembers = () => {
    const {
        getSettings,
        adminSettings,
        isgettingSettings,
        isDeleting,
        deleteTeam
    } = useApi();
    const teamMembers = adminSettings?.teamMembers;
    return (
        <section className="products-container">
            <h2>All Team Members</h2>
            {teamMembers?.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thumbnail</th>
                            <th>Name</th>
                            <th>About</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers?.map((member, index) => {
                            return (
                                <tr id={"ghs-" + (index + 1)} key={index}>
                                    <td id="product-id">{index + 1}</td>
                                    <td>
                                        <img
                                            src={member.memberImage?.url}
                                            alt="Member Image"
                                        />
                                    </td>
                                    <td>{member?.memberName}</td>
                                    <td>{member?.memberAbout.slice(0, 70)}</td>
                                    <td className="action-buttons">
                                        <NavLink
                                            to={`/edit-member/${member?.memberName}`}
                                        >
                                            Edit
                                        </NavLink>
                                        <NavLink
                                            onClick={async e => {
                                                e.preventDefault();
                                                e.target.textContent =
                                                    "Processing...";
                                                await deleteTeam(
                                                    member?.memberName,
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
